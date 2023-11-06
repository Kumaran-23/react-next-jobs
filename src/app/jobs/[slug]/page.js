"use client";
import React, { useEffect, useState } from "react";
import { getUserId } from "../../../../utils/auth";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const JobsSlug = ({ params }) => {
  const [data, setData] = useState({ job: {} }); // Initialize job as an empty object

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            `/api/collections/jobs/records/${params.slug}`
        );
        if (resp.status === 200) {
          const res = await resp.json();

          setData({ job: res });
          console.log(job.user); // Update the state with the fetched job data
        } else {
          setData({ job: {} }); // Set default values if the response status is not 200
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [params.slug]);

  return (
    <div class="mt-10">
      <div class="flex">
        <div class="flex-1">
          {getUserId() == data.job.user && (
              <Link href={`${data.job.id}/edit`}>
                <button className="btn btn-accent hover:btn-primary btn-sm rounded-full font-bold py-2 px-4 mx-1">
                  Edit job
                </button>
              </Link>)}
          <h1 class="text-3xl font-extrabold">{data.job.title}</h1>
          <p class="text-xl">{data.job.employer}</p>
        </div>
      </div>

      <div class="flex flex-row w-full mt-8">
        <div class="basis-2/3 prose max-w-none w-full">
          <h2 class="text-xl font-thin">Description</h2>
          <div>
            <ReactMarkdown>{data.job.description}</ReactMarkdown>
          </div>
          <div class="mt-6" />
          <h2 class="text-xl font-thin">Requirements</h2>
          <div>
            <ReactMarkdown>{data.job.requirements}</ReactMarkdown>
            <div />
            <div class="mt-6" />
            <h2 class="text-xl font-thin">How to Apply?</h2>
            <p>{data.job.applicationInstructions}</p>
          </div>
          <div class="basis-1/3 ml-4">
            <h2 class="text-xl font-thin">Location</h2>
            <p>{data.job.location}</p>
            <div class="mt-6" />
            <h2 class="text-xl font-thin">Salary Range</h2>
            <p>
              USD {data.job.minAnnualCompensation} - USD
              {data.job.maxAnnualCompensation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsSlug;
