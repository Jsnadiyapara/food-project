import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:8000/food";

function Add_Edit() {
  const { id } = useParams();
  const [data, setData] = useState({
    fid: '',
    name: '',
    Image: '',
    desc: '',
    price: '',
    Rating: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(apiUrl + "/" + id)
        .then((res) => res.json())
        .then((res) => setData(res));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    fetch(apiUrl+'/add', { 
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/admin/food");
    });
  };

  const handleEdit = () => {
    fetch(apiUrl + "/edit/" + id, { 
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/admin/food");
      });
  };

  return (
    <>
      <div className="container border border-warning shadow-lg mt-5 p-3">
        
        <h1 className="text-center mb-3 text-primary">{id ? 'Edit Food' : 'Add Food'}</h1>
        <input
          className="form-control mt-2 border border-info"
          type="text"
          name="fid"
          placeholder="Enter FoodID"
          value={data.fid}
          onChange={handleChange}
        />
        <br />
        <input
          className="form-control mt-2 border border-info"
          type="text"
          name="name"
          placeholder="Enter FoodName"
          value={data.name}
          onChange={handleChange}
        />
        <br />
        <input
          className="form-control mt-2 border border-info"
          type="text"
          name="Image"
          placeholder="Enter ImagePath"
          value={data.Image}
          onChange={handleChange}
        />
        <br />
        <input
          className="form-control mt-2 border border-info"
          type="text"
          name="desc"
          placeholder="Enter ItemDescription"
          value={data.desc}
          onChange={handleChange}
        />
        <br />
        <input
          className="form-control mt-2 border border-info"
          type="number"
          name="price"
          placeholder="Enter ItemPrice"
          value={data.price}
          onChange={handleChange}
        />
        <br />
        <input
          className="form-control mt-2 border border-info"
          type="text"
          name="Rating"
          placeholder="Enter Rating"
          value={data.Rating}
          onChange={handleChange}
        />
        <br />
        <br />
        {id === undefined ? (
          <button
            onClick={handleAdd}
            className="btn btn-primary"
          >
            Add
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="btn btn-warning"
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
}

export default Add_Edit;
