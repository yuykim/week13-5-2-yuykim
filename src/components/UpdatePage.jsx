// src/components/UpdatePage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { fetchPlayer, updatePlayer } from "./api";

function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);

  const [form, setForm] = useState({
    name: "",
    height: "",
    weight: "",
    number: "",
  });

  const [editCount, setEditCount] = useState(0);

  const nameRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    fetchPlayer(id)
      .then((data) => {
        setForm({
          name: data.name ?? "",
          height: String(data.height ?? ""),
          weight: String(data.weight ?? ""),
          number: String(data.number ?? ""),
        });
      })
      .catch((err) => {
        console.error(err);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      });
  }, [id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    // 1) state 즉시 업데이트
    const newForm = { ...form, [name]: value };
    setForm(newForm);

    // 2) 수정 횟수 증가
    setEditCount((prev) => prev + 1);

    // 3) API에 즉시 반영 (PUT)
    const body = {
      name: String(newForm.name),
      height: Number(newForm.height),
      weight: Number(newForm.weight),
      number: Number(newForm.number),
    };

    try {
      await updatePlayer(id, body);
      // console.log("자동 저장 완료");
    } catch (err) {
      console.error(err);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

    const handleValidate = () => {
      if (!form.name.trim()) {
        alert("이름은 비어 있을 수 없습니다.");
        nameRef.current.focus();
        return false;
      }
      if (!form.height.trim()) {
        alert("키는 비어 있을 수 없습니다.");
        heightRef.current.focus();
        return false;
      }
      if (!form.weight.trim()) {
        alert("몸무게는 비어 있을 수 없습니다.");
        weightRef.current.focus();
        return false;
      }
      if (!form.number.trim()) {
        alert("등번호는 비어 있을 수 없습니다.");
        numberRef.current.focus();
        return false;
      }
      alert("유효성 검사 통과!");
      return true;
    };


  return (
    <div className="container mt-4">
      <h2>선수 수정 (Update) - ID: {id}</h2>
      <p className="text-muted">총 수정 횟수: {editCount} 회</p>

      <input
        ref={nameRef}
        name="name"
        className="form-control mb-2"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        ref={heightRef}
        name="height"
        type="number"
        className="form-control mb-2"
        placeholder="Height (cm)"
        value={form.height}
        onChange={handleChange}
      />
      <input
        ref={weightRef}
        name="weight"
        type="number"
        className="form-control mb-2"
        placeholder="Weight (kg)"
        value={form.weight}
        onChange={handleChange}
      />
      <input
        ref={numberRef}
        name="number"
        type="number"
        className="form-control mb-2"
        placeholder="Number"
        value={form.number}
        onChange={handleChange}
      />

      <div className="mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => {
            const ok = handleValidate();
            if (ok) {
              navigate("/list");
            }
          }}
        >
          확인
        </button>
      </div>

    </div>
  );
}

export default UpdatePage;
