import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import Loading from "./Loading";

const Exchanges = () => {
  const [exchanges, SetExchanges] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [error, SetError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        SetExchanges(data);
        SetLoading(false);
        console.log(data);
      } catch (error) {
        SetLoading(true);
        SetError(true);
      }
    };
    fetchExchanges();
  }, []);

  
  return (
    <div className="container">
      <div className="ex-box">
        {loading ? (
          <Loading />
        ) : (
          exchanges?.map((item) => {
            return (
              <a target="blank" key={item.id} href={item.url}>
                <img alt={item.name} src={item.image} />
                <h3>{item.name}</h3>
                <h4>{item.trust_score_rank}</h4>
              </a>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Exchanges;
