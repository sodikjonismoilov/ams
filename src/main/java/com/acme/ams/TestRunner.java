package com.acme.ams;

import java.time.LocalDateTime;
import com.acme.ams.AttendanceRecord;
import com.acme.ams.repo.AttendanceRecordRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TestRunner implements CommandLineRunner {
    private final AttendanceRecordRepository repo;

    public TestRunner(AttendanceRecordRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) {
        AttendanceRecord r = new AttendanceRecord();
        r.setStudentId("S12345");
        r.setCourseCode("CSCI335");
        r.setTimestamp(LocalDateTime.now());
        r.setPresent(true);
        repo.save(r);
        System.out.println("Inserted rows: " + repo.count());
    }

}
