import "./UserHome.css";
import Header from "../header/Header";
import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import axios from "axios";

type Student = {
    id: number;
    name: string;
    remaining_pages: number;
}

const UserHome = () => {
    const [showRecentPrints, setShowRecentPrints] = useState(false);
    const recentPrints = Array(10).fill("Tài liệu.docx");
    const [student, setStudent] = useState({
        id: 0,
        name: "",
        remaining_pages: 0,
    } as Student);
    useEffect(() => {
        axios.get("http://localhost:8000/student", {
            headers: {
                Authorization: `${localStorage.getItem("authorization")}`,
            }
        })
            .then((response) => {
                setStudent(response.data);
            })
            .catch((error) => {
                console.error("Error fetching remaining pages:", error);
            });
    }, [])

    return (
        <div className="userHome">
            <div className="userHomeTitle">
                <Header title="Trang chủ" id={student.id} name={student.name} />
            </div>

            <div className="userHomeContent">
                <Card className="dashBoard">
                    <div className="card-content">
                        <h3>Số trang còn lại</h3>
                        <h1>{student.remaining_pages}</h1>
                    </div>
                </Card>
                <Card className="dashBoard">
                    <div className="card-content">
                        <h3>Đã in gần đây</h3>
                        <h1>10</h1>
                    </div>
                    {showRecentPrints && (
                        <div className="recent-prints">
                            {recentPrints.map((doc, index) => (
                                <Button
                                    key={index}
                                    label={doc}
                                    className="p-button-outlined p-button-secondary"
                                />
                            ))}
                        </div>
                    )}
                    <div
                        className={`toggle-button ${showRecentPrints ? "right" : "left"}`}
                    >
                        <Button
                            icon={`pi ${showRecentPrints ? "pi-chevron-up" : "pi-chevron-down"
                                }`}
                            className="p-button-text"
                            onClick={() => setShowRecentPrints(!showRecentPrints)}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};
export default UserHome;
