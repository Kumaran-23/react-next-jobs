"use client";
import React, { useEffect, useState } from "react";
import { getTokenFromLocalStorage, getUserId, isValidToken } from "../../../../../utils/auth";
import { useRouter } from "next/navigation";

function updateJobs({ params }) {
  const router = useRouter();
  const [data, setData] = useState({ job: null }); // Initialize job as null initially
  const [formData, setFormData] = useState({
    user: "",
    title: "",
    minAnnualCompensation: "",
    maxAnnualCompensation: "",
    description: "",
    requirements: "",
    applicationInstructions: "",
    location: "",
    employer: "",
  });


  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            `/api/collections/jobs/records/${params.slug}`
        );
        const res = await resp.json();

        if (resp.status === 200) {
          setData({ job: res }); // Store the fetched job data in the state
          setFormData({
            user: getUserId(),
            title: res.title,
            minAnnualCompensation: res.minAnnualCompensation,
            maxAnnualCompensation: res.maxAnnualCompensation,
            description: res.description,
            requirements: res.requirements,
            applicationInstructions: res.applicationInstructions,
            location: res.location,
            employer: res.employer,
          });
        } else {
          setData({ job: null }); // Set job to null or handle error state
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({ job: null }); // Set job to null in case of an error
      }
    }

    fetchData();
  }, [params.slug]);
  
  const postEditedJob = () => {
    router.push("/");
  };

  const editJob = async (evt) => {
    evt.preventDefault();

    const jobData = {
      user: getUserId(),
      title: formData.title,
      minAnnualCompensation: formData.minAnnualCompensation,
      maxAnnualCompensation: formData.maxAnnualCompensation,
      description: formData.description,
      requirements: formData.requirements,
      applicationInstructions: formData.applicationInstructions,
      location: formData.location,
      employer: formData.employer,
    };
    console.log(jobData);

    const resp = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
        `/api/collections/jobs/records/${data.job.id}`,
      {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTokenFromLocalStorage(),
        },
        body: JSON.stringify(jobData),
      }
    );

    if (resp.status == 200) postEditedJob();
  };

  if (data.job === null) {
    return <div>Loading job data...</div>;
  }

  return (
    <div>
      <h1 className="text-center text-xl">Update Job Listing</h1>
      <div className="container mx-auto">
        <form onSubmit={editJob}>
          <div className="form-control w-full mb-3">
            <label className="label" htmlFor="title">
              <span className="label-text">Job Title</span>
            </label>
            <input
              type="text"
              name="title"
              className="input input-bordered input-primary w-full"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="form-control w-full mb-2">
            <label className="label" htmlFor="minAnnualCompensation">
              <span className="label-text">Minimum Annual Compensation</span>
            </label>
            <input
              type="number"
              name="minAnnualCompensation"
              className="input input-bordered input-primary w-full"
              required
              value={formData.minAnnualCompensation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  minAnnualCompensation: e.target.value,
                })
              }
            />
            <label className="label" htmlFor="minAnnualCompensation">
              <span className="label-text">USD per anum</span>
            </label>
          </div>
          <div className="form-control w-full mb-2">
            <label className="label" htmlFor="maxAnnualCompensation">
              <span className="label-text">Maximum Annual Compensation</span>
            </label>
            <input
              type="number"
              name="maxAnnualCompensation"
              className="input input-bordered input-primary w-full"
              required
              value={formData.maxAnnualCompensation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxAnnualCompensation: e.target.value,
                })
              }
            />
             <label className="label" htmlFor="maxAnnualCompensation">
              <span className="label-text">USD per anum</span>
            </label>
          </div>
          <div className="form-control w-full mb-2">
            <label className="label" htmlFor="description">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered textarea-primary h-30"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="form-control w-full mb-2">
            <label className="label" htmlFor="requirements">
              <span className="label-text">Requirements</span>
            </label>
            <textarea
              name="requirements"
              className="textarea textarea-bordered textarea-primary h-30"
              required
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
            />
          </div>
          <div className="form-control w-full mb-2">
            <label className="label" htmlFor="applicationInstructions">
              <span className="label-text">Application Instructions</span>
            </label>
            <textarea
              name="applicationInstructions"
              className="textarea textarea-bordered textarea-primary h-30"
              required
              value={formData.applicationInstructions}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  applicationInstructions: e.target.value,
                })
              }
            />
          </div>
          <div className="form-control w-full mb-2">
            <label className="label" htmlFor="location">
              <span className="label-text">Job Location</span>
            </label>
            <input
              type="text"
              name="location"
              className="input input-bordered input-primary w-full"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
          <div className="form-control w-full mb-2">
            <label className="label" htmlFor="employer">
              <span className="label-text">Company name</span>
            </label>
            <input
              type="text"
              name="employer"
              className="input input-bordered input-primary w-full"
              required
              value={formData.employer}
              onChange={(e) =>
                setFormData({ ...formData, employer: e.target.value })
              }
            />
          </div>
          <div className="form-control w-full mt-4">
            <button className="btn btn-md btn-accent hover:btn-primary">Update Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default updateJobs;