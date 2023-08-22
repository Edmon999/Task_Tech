import React, { useState, useEffect } from "react";

import { UserCard } from "../UserCard/UserCard";
import Loading from "../Loading/Loading";

import { getUserData } from "../../services/api-service";
import { User } from "../../interfaces";

import "./InfiniteScroll.css";

const InfiniteScroller: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getUserData(page);
      setData((prevData) => [...prevData, ...response]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card-container">
      {data?.map((user) => (
        <UserCard
          userData={{
            avatar: user.avatar,
            first_name: user.first_name,
            last_name: user.last_name,
            password: user.password,
            email: user.email,
            phone_number: user.phone_number,
          }}
          key={user.uid}
        />
      ))}
      {loading && <Loading />}
    </div>
  );
};

export default InfiniteScroller;
