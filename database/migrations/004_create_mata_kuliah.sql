-- Mata kuliah table
CREATE TABLE mata_kuliah (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kode_matkul VARCHAR(20) UNIQUE NOT NULL,
    nama_matkul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 8),
    sks INTEGER NOT NULL DEFAULT 2,
    dosen_id UUID REFERENCES users(id) ON DELETE SET NULL,
    lab_room_id UUID REFERENCES lab_rooms(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT valid_sks CHECK (sks BETWEEN 1 AND 6)
);

-- Add indexes
CREATE INDEX idx_mata_kuliah_kode ON mata_kuliah(kode_matkul);
CREATE INDEX idx_mata_kuliah_dosen ON mata_kuliah(dosen_id);
CREATE INDEX idx_mata_kuliah_semester ON mata_kuliah(semester);

-- Add trigger
CREATE TRIGGER update_mata_kuliah_updated_at 
    BEFORE UPDATE ON mata_kuliah 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE mata_kuliah ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Everyone can read mata kuliah" ON mata_kuliah 
    FOR SELECT USING (true);

CREATE POLICY "Dosen can manage own mata kuliah" ON mata_kuliah 
    FOR ALL USING (
        dosen_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.id = auth.uid() AND u.role IN ('admin', 'dev_super')
        )
    );

CREATE POLICY "Admins can manage all mata kuliah" ON mata_kuliah 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.id = auth.uid() AND u.role IN ('admin', 'dev_super')
        )
    );

SELECT 'Mata kuliah table created successfully' as message;