import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiurl = "http://localhost:8000/food";

function Get_all_item() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(apiurl)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return (
    <>
      <nav className="navbar mt-3 mb-3">
        <div className="container row">
          <Link className="btn btn-primary col-1 mx-5" to="/admin/food/add">
            Add
          </Link>
          <h1 className="text-primary text-center col">Food Menu</h1>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          {data.map((item) => (
            <div key={item.fid} className="card col-2 g-1 m-3 border border-2 border-danger">
              <img src={item.Image} className="card-img-top" alt={item.name} height={200} />
              <div className="card-body">
                <h5 className="card-title text-center text-primary mt-1">{item.name}</h5>
                <h5 className="card-title text-center text-primary mt-1">Price is: {item.price}</h5>
                <div className="text-center">
                  <Link to={`/admin/food/${item.fid}`} type="button" className="btn btn-primary mt-2">
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Get_all_item;
