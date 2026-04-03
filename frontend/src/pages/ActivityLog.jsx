import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { Clock,Shield } from "lucide-react";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await api.get("/admin/logs");
      console.log("Activity Logs: ", data.data);
      setLogs(data.data);
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 animate-in fade-in duration-500">
      <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Shield size={20} className="text-indigo-600" /> Security Audit Trail
      </h3>

      {logs.length === 0 ? (
        <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl">
          <p className="text-sm text-slate-400 italic">
            No activity logs found in the ledger.
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {logs.map((log) => (
            <div
              key={log._id}
              className="flex items-start gap-4 p-5 bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-2xl text-sm border border-transparent hover:border-slate-200"
            >
              <div className="bg-white p-2.5 rounded-xl shadow-sm text-indigo-600">
                <Clock size={16} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-slate-900 font-bold truncate">
                  {log.user?.username || "Deleted User"}
                  <span className="mx-2 font-normal text-slate-400 lowercase tracking-tight italic">
                    performed
                  </span>
                  <span className="text-indigo-600 uppercase text-[10px] tracking-widest font-black">
                    {log.action.replace("_", " ")}
                  </span>
                </p>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  {log.details}
                </p>
                {log.targetUser && log.targetUser !== "Self" && (
                  <p className="text-[10px] text-indigo-400 mt-1 font-bold">
                    Target: {log.targetUser}
                  </p>
                )}
              </div>

              <div className="text-right flex flex-col items-end gap-1">
                <span className="text-[10px] font-black text-slate-400 uppercase whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleDateString()}
                </span>
                <span className="text-[9px] font-medium text-slate-300">
                  {new Date(log.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
