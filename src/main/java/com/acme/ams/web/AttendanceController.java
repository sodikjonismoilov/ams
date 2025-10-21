package com.acme.ams.web;


import com.acme.ams.AttendanceRecord;
import com.acme.ams.repo.AttendanceRecordRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceRecordRepository repo;


    public AttendanceController(AttendanceRecordRepository repo) {
        this.repo = repo;
    }
   //Get /api/attendance -> list all records
    @GetMapping
    public List<AttendanceRecord> list() {
        List<AttendanceRecord> all = repo.findAll();
        return all.size() > 100 ? all.subList(0, 100) : all;
    }

    @PostMapping
    public AttendanceRecord create(@RequestBody AttendanceRecord body) {
        // ignore incoming id
        body.setId(null);
        if (body.getTimestamp() == null) {
            body.setTimestamp(java.time.LocalDateTime.now());
        }
        return repo.save(body);
    }

    @GetMapping("/search")
    public List<AttendanceRecord> findByStudent(@org.springframework.web.bind.annotation.RequestParam String studentId) {
        return repo.findByStudentIdOrderByTimestampDesc(studentId);
    }

    @GetMapping("/by-course")
    public java.util.List<AttendanceRecord> findByCourse(
            @org.springframework.web.bind.annotation.RequestParam String courseCode) {
        return repo.findByCourseCodeOrderByTimestampDesc(courseCode);
    }

    @GetMapping("/by-date")
    public java.util.List<AttendanceRecord> byDate(
            @org.springframework.web.bind.annotation.RequestParam String start,
            @org.springframework.web.bind.annotation.RequestParam String end) {
        var startDate = java.time.LocalDate.parse(start).atStartOfDay();
        // inclusive end: go to next day start
        var endDateExclusive = java.time.LocalDate.parse(end).plusDays(1).atStartOfDay();
        return repo.findByTimestampBetweenOrderByTimestampDesc(startDate, endDateExclusive);
    }


}
