-- Jadwal praktikum table
CREATE TABLE jadwal_praktikum (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mata_kuliah_id UUID NOT NULL REFERENCES mata_kuliah(id) ON DELETE CASCADE,
    lab_room_id UUID NOT NULL REFERENCES lab_rooms(id) ON DELETE RESTRICT,
    dosen_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    tanggal_praktikum DATE NOT NULL,
    waktu_mulai TIME NOT NULL,
    waktu_selesai TIME NOT NULL,
    topik VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    status jadwal_status DEFAULT 'scheduled',
    max_mahasiswa INTEGER DEFAULT 20,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT valid_waktu CHECK (waktu_selesai > waktu_mulai),
    CONSTRAINT future_date CHECK (tanggal_praktikum >= CURRENT_DATE)
);

-- Add indexes
CREATE INDEX idx_jadwal_mata_kuliah ON jadwal_praktikum(mata_kuliah_id);
CREATE INDEX idx_jadwal_lab_room ON jadwal_praktikum(lab_room_id);
CREATE INDEX idx_jadwal_dosen ON jadwal_praktikum(dosen_id);
CREATE INDEX idx_jadwal_tanggal ON jadwal_praktikum(tanggal_praktikum);

-- Add trigger
CREATE TRIGGER update_jadwal_praktikum_updated_at 
    BEFORE UPDATE ON jadwal_praktikum 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE jadwal_praktikum ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Everyone can read jadwal" ON jadwal_praktikum 
    FOR SELECT USING (true);

CREATE POLICY "Dosen can manage own jadwal" ON jadwal_praktikum 
    FOR ALL USING (
        dosen_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.id = auth.uid() AND u.role IN ('admin', 'dev_super')
        )
    );

SELECT 'Jadwal praktikum table created successfully' as message;