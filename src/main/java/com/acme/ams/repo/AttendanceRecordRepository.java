package com.acme.ams.repo;

import com.acme.ams.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {
    List<AttendanceRecord> findByStudentIdOrderByTimestampDesc(String studentId);

    List<AttendanceRecord> findByCourseCodeOrderByTimestampDesc(String courseCode);

    List<com.acme.ams.AttendanceRecord>
    findByTimestampBetweenOrderByTimestampDesc(java.time.LocalDateTime start, java.time.LocalDateTime end);
}

