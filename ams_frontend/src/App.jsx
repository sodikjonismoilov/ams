import React, {useEffect, useState}from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "./components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./components/ui/input";

import ThemeToggle from "./components/ThemeToggle";

const API_URL = "http://localhost:8080/api/attendance";

export default function App() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  //form state
  const [studentId, setStudentId] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [present , setPresent] = useState(true);

  useEffect(() => {
    load();
  }, []);
  
  async function load() {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(API_URL);
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRows(data);
    } catch (e) {
      const msg = String(e.message || e);
      setErr(msg);
      toast.error(`Load failed: ${msg}`)
    } finally {
      setLoading(false);
    }
  }
   
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ studentId, courseCode, present}),
      });
      if (!res.ok) throw new Error(`POST failed: HTTP ${res.status}`);

      setStudentId("");
      setCourseCode("");
      setPresent(true);
      toast.success("Attendance saved successfully :)");
      await load();
    } catch (e) {
      toast.error(String(e.message || e));
    }
}

return (
  <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">
    <header className="border-b border-black/10 dark:border-white/10">
    <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Attendance Tracker</h1>
      <ThemeToggle />
    </div>
    </header>

    <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
      <Card className="
      bg-gray-50/60 border-black/10 dark:bg-gray-900/60 dark:border-white/10 dark:text-white p-4">
      <form 
        onSubmit={handleSubmit}
        className="grid gap-3 grid-cold-1 sm:grid-cols-3 item-end"
        >
          <div className="space-y-1">
            <Label htmlFor="student">Student ID</Label>
            <Input 
              id="student"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="S12345"
              required
              />
          </div>
          <div className="space-y-1">
            <Label htmlFor="course">Course Code</Label>
            <Input  
               id="course"
               value={courseCode}
               onChange={(e) => setCourseCode(e.target.value)}
                placeholder="CSCI101"
                required
                />
                </div>
          <div className="space-y-1">
          <Label htmlFor="present" className="mr-2">Present</Label>
              <select
                id="present"
                value={present ? "yes" : "no"}
                onChange={(e) => setPresent(e.target.value === "yes")}
                className="h-9 rounded-md border border-black/10 bg-white px-3 py-2 text-sm 
             outline-none focus:ring-2 focus:ring-black/20
             dark:border-white/10 dark:bg-gray-900 dark:focus:ring-white/20"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <Button type="submit" className="h-9 bg-blue-600 hover:bg-blue-700">
              Add
            </Button>
        </form>
      </Card>
      

      {/* Attendance Records Table */}
       <Card className="
       bg-gray-50/60 border-black/10 dark:bg-gray-900/60 dark:border-white/10 dark:text-white p-4">
         {loading ? (
          <div className="p-4">Loading...</div>
         ) : err ? (
          <div className="p-4 text-red-400">Error: {err}</div>
         ) : rows.length === 0 ? (
          <div className="p-4 text-sm text-gray-400">No attendance records found. Add one above.</div>
         ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-white/5">
              <tr className="border-b border-black/10 dark:border-white/10">
                    <th className="text-left py-2 px-3 font-medium">ID</th>
                    <th className="text-left py-2 px-3 font-medium">Student</th>
                    <th className="text-left py-2 px-3 font-medium">Course</th>
                    <th className="text-left py-2 px-3 font-medium">Timestamp</th>
                    <th className="text-left py-2 px-3 font-medium">Present</th>
                  </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-black/10 last:border-b-0 dark:border-white/10">
                  <td className="py-2 px-3">{r.id}</td>
                  <td className="py-2 px-3">{r.studentId}</td>
                  <td className="py-2 px-3">{r.courseCode}</td>
                  <td className="py-2 px-3">
                    {new Date(r.timestamp).toLocaleString()}
                  </td>
                  <td className="py-2 px-3">{r.present ? "Yes" : "No"}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
         )}
       </Card>

        <Card className="
         bg-gray-50/60 border-black/10 dark:bg-gray-900/60 dark:border-white/10 
         dark:text-white p-4">
        <div className="text-sm text-gray-500">
        Coming next: quick attendance graph and a tiny “smart” hint like
        suggesting Present/Absent based on recent history.
          </div>
        </Card>
      </main>
  </div>
);
}