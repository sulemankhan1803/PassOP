import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const url = "https://passop-in7e.onrender.com/"
  // const url = "http://localhost:3000/"
  const getPasswords = async () => {
    let req = await fetch(url);
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/hide.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hide.png";
      passwordRef.current.type = "text";
    }
  };


  const savePassword = async () => {
  if (
    form.site.length > 3 &&
    form.username.length > 3 &&
    form.password.length > 3
  ) {
    try {
      if (form.id) {
        await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id }),
        });
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Unknown error occurred");
      }

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      setForm({ site: "", username: "", password: "" });
      toast.success("Password saved!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  } else {
    toast.error("Please fill all fields with more than 3 characters.");
  }
};


  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password ?");

    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    }
    toast("Password Deleted!");
  };

  const editPassword = (id) => {
    setForm({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to clipboard!");
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 pt-7 md:px-40 md:mycontainer min-h-[77.5vh]">
        <h1 className="text-4xl text-center font-bold">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex items-center flex-col p-4 gap-8">
          <input
            className="rounded-full bg-white border w-full border-green-500 text-black p-4 py-1"
            type="text"
            onChange={handleChange}
            name="site"
            id="site"
            value={form.site}
            placeholder="Enter URL"
          />

          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              className="rounded-full bg-white border w-full border-green-500 text-black p-4 py-1"
              type="text"
              onChange={handleChange}
              name="username"
              id="username"
              value={form.username}
              placeholder="Enter Username"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                className="relative rounded-full bg-white border w-full border-green-500 text-black p-4 py-1"
                type="password"
                onChange={handleChange}
                name="password"
                id="password"
                value={form.password}
                placeholder="Enter Password"
              />
              <span
                className="absolute right-[4px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  src="icons/eye.png"
                  alt="eye"
                  width={26}
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className=" w-fit text-black flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && (
            <div className="overflow-x-auto rounded-md mb-10">
              <table className="table-auto w-full">
                {/* <table className="table-auto w-full overflow-hidden rounded-md mb-10"> */}
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center">
                            {item.username}
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center">
                            {"*".repeat(item.password.length)}
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
