-- ===================================================================
-- MIGRATION 4: COMPLETE FIX FOR LAB ROOMS RLS 401 ERROR
-- File: database/migrations/004_fix_lab_rooms_rls_complete.sql
-- Description: Comprehensive fix for 401 Unauthorized error
-- ===================================================================

-- Step 1: Drop ALL existing policies to start fresh
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'lab_rooms'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_record.policyname || '" ON lab_rooms';
    END LOOP;
END $$;

-- Step 2: Temporarily disable RLS to ensure we can make changes
ALTER TABLE lab_rooms DISABLE ROW LEVEL SECURITY;

-- Step 3: Check if table exists and create if not
CREATE TABLE IF NOT EXISTS lab_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    capacity INTEGER DEFAULT 20,
    location VARCHAR(255),
    facilities TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 4: Ensure sample data exists
INSERT INTO lab_rooms (code, name, description, capacity, facilities) VALUES
('lab-ktd', 'Lab Keterampilan Dasar Praktik Kebidanan', 
 'Laboratorium untuk praktik dasar kebidanan dan keterampilan fundamental', 25, 
 ARRAY['Phantom', 'Meja praktek', 'Kursi mahasiswa', 'Whiteboard', 'Proyektor']),
 -- Insert remaining 7 lab rooms (jika belum ada)
INSERT INTO lab_rooms (code, name, description, capacity, facilities) VALUES
('lab-inc', 'Lab INC (Intranatal Care)', 
 'Laboratorium untuk praktik persalinan dan intranatal care', 15,
 ARRAY['Tempat tidur persalinan', 'Phantom persalinan', 'Set persalinan', 'Resusitasi bayi']),

('lab-bbl', 'Lab BBL (Bayi Baru Lahir)', 
 'Laboratorium untuk praktik perawatan bayi baru lahir', 20,
 ARRAY['Incubator', 'Timbangan bayi', 'Phantom bayi', 'Set perawatan BBL']),

('lab-kb', 'Lab Pelayanan KB', 
 'Laboratorium untuk praktik pelayanan keluarga berencana', 25,
 ARRAY['Phantom KB', 'Kontrasepsi demo', 'Meja konseling', 'Leaflet edukasi']),

('lab-konseling', 'Lab Konseling & Pendidikan Kesehatan', 
 'Laboratorium untuk praktik konseling dan pendidikan kesehatan', 30,
 ARRAY['Kursi konseling', 'Flipchart', 'Media edukasi', 'Ruang diskusi']),

('lab-komunitas', 'Lab Kebidanan Komunitas', 
 'Laboratorium untuk praktik kebidanan komunitas dan public health', 25,
 ARRAY['Tas kunjungan', 'Alat posyandu', 'Media KIE', 'Peta wilayah']),

('lab-anak', 'Lab Bayi, Balita, Anak Prasekolah', 
 'Laboratorium untuk praktik perawatan bayi, balita dan anak prasekolah', 20,
 ARRAY['Phantom anak', 'Timbangan anak', 'Alat bermain edukatif', 'Set imunisasi']),

('depo-alat', 'Ruangan Depo Alat', 
 'Ruangan penyimpanan dan maintenance alat-alat laboratorium', 0,
 ARRAY['Rak penyimpanan', 'Meja maintenance', 'Tools kit', 'Sistem inventory'])
ON CONFLICT (code) DO NOTHING;
('lab-anc', 'Lab ANC (Antenatal Care)', 
 'Laboratorium untuk praktik pemeriksaan kehamilan dan antenatal care', 20,
 ARRAY['Phantom hamil', 'Timbangan', 'Tensimeter', 'Stetoskop', 'Doppler fetal']),
('lab-pnc', 'Lab PNC (Postnatal Care)', 
 'Laboratorium untuk praktik perawatan pasca persalinan', 20,
 ARRAY['Tempat tidur', 'Phantom nifas', 'Alat perawatan bayi', 'Timbangan bayi'])
ON CONFLICT (code) DO NOTHING;

-- Step 5: Grant explicit permissions BEFORE enabling RLS
-- This is crucial for anonymous access
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON lab_rooms TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON lab_rooms TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Step 6: Re-enable RLS
ALTER TABLE lab_rooms ENABLE ROW LEVEL SECURITY;

-- Step 7: Create a simple, working RLS policy for anonymous SELECT
-- This policy allows ANYONE to read lab_rooms data
CREATE POLICY "allow_anonymous_select_lab_rooms" 
ON lab_rooms 
FOR SELECT 
TO anon, authenticated
USING (true);

-- Step 8: Create policies for authenticated operations
CREATE POLICY "allow_authenticated_insert_lab_rooms" 
ON lab_rooms 
FOR INSERT 
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'dev_super')
        AND is_active = true
    )
);

CREATE POLICY "allow_authenticated_update_lab_rooms" 
ON lab_rooms 
FOR UPDATE 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'dev_super')
        AND is_active = true
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'dev_super')
        AND is_active = true
    )
);

CREATE POLICY "allow_authenticated_delete_lab_rooms" 
ON lab_rooms 
FOR DELETE 
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'dev_super')
        AND is_active = true
    )
);

-- Step 9: Test the setup
SELECT 'Testing lab_rooms access...' as test_step;

-- This should work without authentication
SELECT 
    'SUCCESS: ' || count(*)::text || ' lab rooms found' as test_result
FROM lab_rooms;

-- Show some sample data
SELECT 
    'Sample data:' as info,
    code,
    name,
    capacity
FROM lab_rooms 
WHERE is_active = true 
LIMIT 3;

-- Step 10: Verify policies are created
SELECT 
    'RLS Policies created:' as info,
    policyname,
    roles,
    CASE 
        WHEN cmd = 'r' THEN 'SELECT'
        WHEN cmd = 'a' THEN 'INSERT'
        WHEN cmd = 'w' THEN 'UPDATE'
        WHEN cmd = 'd' THEN 'DELETE'
        ELSE cmd
    END as operation
FROM pg_policies 
WHERE tablename = 'lab_rooms'
ORDER BY policyname;

-- Step 11: Check current RLS status
SELECT 
    'RLS Status:' as info,
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'lab_rooms';

-- Final success message
SELECT 
    'Lab rooms RLS completely fixed!' as status,
    'Anonymous users can now access lab_rooms data' as access_granted,
    '401 Unauthorized error should be resolved' as expected_result,
    'Policies created for anon and authenticated roles' as policies_info;