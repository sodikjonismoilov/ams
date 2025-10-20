package com.acme.ams;

import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Entity
@Table(name = "attendance_record")
public class AttendanceRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;
    private String courseCode;
    private LocalDateTime timestamp;
    private boolean present;

    public AttendanceRecord() {

    }
    //Getter
    public Long getId() { return id;}
    public String getStudentId() { return studentId;}
    public String getCourseCode() { return courseCode;}
    public LocalDateTime getTimestamp() { return timestamp;}
    public boolean isPresent() { return present;}

    //Setter
    public void setId(Long id) { this.id =id; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public void setPresent(boolean present) { this.present = present; }

}
