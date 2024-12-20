import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const UpdateJob = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [job, setJob] = useState({});
  const { price, title, description, category, bid_count } = job || {};

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJob = async () => {
    await axios.get(`http://localhost:9000/update/${id}`).then((res) => {
      setJob(res.data);
      setStartDate(new Date(res.data?.deadLine));
    });
  };

  const handleUpdatedJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.job_title.value;
    const category = form.category.value;
    const minPrice = parseFloat(form.min_price.value);
    const maxPrice = parseFloat(form.max_price.value);
    const description = form.description.value;
    const email = form.email.value;
    const deadLine = startDate;
    const price = { minPrice, maxPrice };
    const updatedJob = {
      title,
      deadLine,
      category,
      price,
      description,
      buyer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
      bid_count
    };

    // create jobs
    axios.post(`http://localhost:9000/update/${id}`, updatedJob).then((res) => {
      console.log(res.data);
      if(res.data.modifiedCount){
        toast.success('jobs successfully updated')
        navigate('/my-posted-jobs')
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Update a Job
        </h2>

        <form onSubmit={handleUpdatedJob}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="job_title">
                Job Title
              </label>
              <input
                defaultValue={title}
                id="job_title"
                name="job_title"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                defaultValue={user?.email}
                id="emailAddress"
                type="email"
                name="email"
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            {category && (
              <div className="flex flex-col gap-2 ">
                <label className="text-gray-700 " htmlFor="category">
                  Category
                </label>
                <select
                  defaultValue={category}
                  name="category"
                  id="category"
                  className="border p-2 rounded-md"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Graphics Design">Graphics Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
              </div>
            )}
            <div>
              <label className="text-gray-700 " htmlFor="min_price">
                Minimum Price
              </label>
              <input
                defaultValue={price?.minPrice}
                id="min_price"
                name="min_price"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="max_price">
                Maximum Price
              </label>
              <input
                defaultValue={price?.maxPrice}
                id="max_price"
                name="max_price"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              id="description"
              cols="30"
              defaultValue={description}
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateJob;
