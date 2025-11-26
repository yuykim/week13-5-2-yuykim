// src/components/DetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPlayer } from "./api";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetchPlayer(id)
      .then(setPlayer)
      .catch((err) => {
        console.error(err);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      });
  }, [id]);

  if (!player) {
    return (
      <div className="p-4">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2>선수 상세 정보 (ID: {player.id})</h2>
      <ul className="list-group mb-3">
        <li className="list-group-item">이름: {player.name}</li>
        <li className="list-group-item">키: {player.height}cm</li>
        <li className="list-group-item">몸무게: {player.weight}kg</li>
        <li className="list-group-item">등번호: No.{player.number}</li>
      </ul>
      <button
        className="btn btn-secondary me-2"
        onClick={() => navigate("/list")}
      >
        목록으로
      </button>
      <button
        className="btn btn-warning"
        onClick={() => navigate(`/update/${player.id}`)}
      >
        수정하러 가기
      </button>
    </div>
  );
}

export default DetailPage;
