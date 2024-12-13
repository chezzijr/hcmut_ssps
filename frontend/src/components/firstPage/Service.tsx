import React from "react";
import "./Service.css";
import docImage from "./doc.png";
import printerImage from "./printer.png";
import boxImage from "./box.png";
import valiImage from "./vali.png";

const Service: React.FC = () => {
  return (
    <div>
      <div className="title">Dịch vụ của chúng tôi</div>

      <div className="menuService">
        <div className="contents">
          <div>
            <img src={docImage} className="img" alt="Tải lên dễ dàng" />
          </div>
          <div className="smallTitle">Tải lên dễ dàng</div>
          <div className="info">
            Tải lên dữ liệu của bạn chỉ với vài cú nhập chuột
          </div>
        </div>

        <div className="contents">
          <div>
            <img src={printerImage} className="img" alt="In chất lượng cao" />
          </div>
          <div className="smallTitle">In chất lượng cao</div>
          <div className="info">
            Công nghệ in tiên tiến cho kết quả tuyệt vời
          </div>
        </div>

        <div className="contents">
          <div>
            <img src={boxImage} className="img" alt="Nhanh chóng tiện lợi" />
          </div>
          <div className="smallTitle">Nhanh chóng tiện lợi</div>
          <div className="info">
            Tài liệu được in nhanh chóng và nhận ở máy in gần nhất
          </div>
        </div>

        <div className="contents">
          <div>
            <img src={valiImage} className="img" alt="Phục vụ tận tâm" />
          </div>
          <div className="smallTitle">Phục vụ tận tâm</div>
          <div className="info">
            Đội ngủ hỗ trợ luôn sẵn sàng đáp ứng nhu cầu của bạn
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
