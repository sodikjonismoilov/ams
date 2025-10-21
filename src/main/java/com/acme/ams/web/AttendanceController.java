package com.acme.ams.web;


import com.acme.ams.AttendanceRecord;
import com.acme.ams.repo.AttendanceRecordRepository;
import org.springframework.web.bind.annotation.GetMapping;
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

}
