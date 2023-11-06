"use client";
import { useEffect, useState } from "react";
import humanize from 'humanize-plus';

export default function App() {
  const [data, setData] = useState({ jobs: [] });

  // Define a function that makes an HTTP request to your backend to get data

  async function getJobs() {
    try {
      const resp = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          "/api/collections/jobs/records"
      );
      if (resp.status === 200) {
        const res = await resp.json();
        return { jobs: res.items };
      } else {
        return { jobs: [] };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return { jobs: [] };
    }
  }

  // Use useEffect to mimic Svelte's onMount
  useEffect(() => {
    async function fetchData() {
      const result = await getJobs();
      console.log(result);
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center text-xl font-bold">Find Your Next Job</h1>
      <div className="flex items-center">
        <div className="overflow-hidden text-center flex flex-col items-center">
          {data.jobs.map((job) => (
          <div className="mt-6 mb-5 card w-4/6 bg-accent hover:bg-primary-focus hover:transition 
          delay-150 hover:translate-x-16 hover:skew-x-6 shadow-xl shadow-secondary hover:shadow-indigo-800" key={job.id}>
            <div className="card-body ">
              <a className="font-bold text-2xl" href={`/jobs/${job.id}`}>
                {job.title}
              </a>
              <div className="text-sm mt-1">
                {job.employer} . {job.location} .{" "}
                <span class="text-sm">
                  USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}
                  </span>
              </div>
              <div className="italic text-xs opacity-50 mt-2">
                posted{" "}
                {new Date(job.created).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="mt-4">{job.description.slice(0, 240)}...</div>
          </div>
        ))}
      </div>
    </div>
        </div>
        
  );
}