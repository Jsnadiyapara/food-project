import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
const apiUrl =  "http://localhost:8000/food";

function GetById() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mt-3 border border-3 border-primary rounded">
      <div className="row">
        <div className="col-3 mb-5">
          <img src={data.Image} width={300} height={300} className="img" alt={data.name} />
        </div>
        <div className="col">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <h1 className="text-primary ms-3">Name: {data.name}</h1>
                  {auth?.role === 1 ? (
                    <>
                      
                     
                      <button
                        className="btn btn-primary border border-2 border-primary m-3"
                        onClick={() => navigate(`/admin/food/${id}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger m-3 border border-2 border-danger"
                        onClick={() => {
                          fetch(`${apiUrl}/${id}`, {
                            method: "DELETE",
                          })
                            .then((res) => res.json())
                            .then((res) => {
                              console.log(res);
                              navigate("/admin/food");
                            });
                        }}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                    <h5 className="text-danger ms-3">Description: {data.desc}</h5>
                      <h5 className="text-danger ms-3">Price: {data.price}</h5>
                      <h5 className="text-danger ms-3">Rating: {data.Rating}</h5>
                    </>
                  )}
                  <button
                    className="btn btn-warning m-3 border border-2 border-warning"
                    onClick={() => navigate(auth?.role === 1 ? '/admin/food' : '/')}
                  >
                    Back
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GetById;
