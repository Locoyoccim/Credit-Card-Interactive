import React, { useState } from "react";
import img from "./assets/images/bg-main-mobile.png";
import logo from "./assets/images/card-logo.svg";
import front_card from "./assets/images/bg-card-front.png";
import back_card from "./assets/images/bg-card-back.png";
import arrow from "./assets/images/icon-complete.svg";

function Top() {
  const [form, setForm] = useState({
    card: "0000 0000 0000 0000",
    name: "Jane Appleseed",
    month: "00",
    year: "00",
    cvc: "000",
  });

  const validator = {
    card: /^(4[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}(?:\s?[0-9]{3})?|5[1-5][0-9]{2}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}(?:\s?[0-9]{3})?|6(?:011|5[0-9]{2})\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}(?:\s?[0-9]{3})?|3[47]\s?[0-9]{2}\s?[0-9]{6}\s?[0-9]{5}|3(?:0[0-5]|[68][0-9])\s?[0-9]{6}\s?[0-9]{4}\s?[0-9]{3}|(?:2131|1800|35\d{2})\s?[0-9]{6}\s?[0-9]{5}\s?[0-9]{3})$/,
    name: /^[a-zA-ZÁ-ÿ']+([- ][a-zA-ZÁ-ÿ']+)*$/,
    month: /^(0?[1-9]|1[0-2])$/,
    year: /^(2[3-9]|[3-5][0-9]|60)$/,
    cvc: /^\d{3}$/,
  };

  const { name, card, month, year, cvc } = form;

  const cambio = (event, prop) => {
    setForm((estado) => ({ ...estado, [prop]: event.target.value }));
  };

  function validar(e) {
    e.preventDefault();

    const formIsValid =
      validator.card.test(form.card) &&
      validator.name.test(form.name) &&
      validator.cvc.test(form.cvc) &&
      validator.month.test(form.month) &&
      validator.year.test(form.year);

    if (!formIsValid) {
      document.querySelectorAll("input").forEach((input) => {
        const isEmpty = input.value.trim() === "";

        if (isEmpty) {
          input.style.borderColor = "red";
          input.classList.add("error");
          const correspondingContainer = input
            .closest("div")
            .querySelector(".error_container");

          if (correspondingContainer) {
            correspondingContainer.classList.add("active");
          }
        } else {
          input.style.borderColor = "var(--Dark_grayish_violet)";
          input.classList.remove("error");
        }
      });

      setTimeout(() => {
        document.querySelectorAll(".error_container").forEach((container) => {
          container.classList.remove("active");
        });
        document.querySelectorAll("input").forEach((input) => {
          input.style.borderColor = "var(--Dark_grayish_violet)";
          input.classList.remove("error");
        });
      }, 3000);
    } else {
      document.getElementsByClassName("send_msj")[0].style.display = "block";
      document.querySelector("form").style.display = "none";
    }

    if (!validator.card.test(form.card)) {
      document.querySelector("#card_number").style.borderColor = "red";
      document.querySelector("#card_error_msj").classList.toggle("active");
    }
  }

  function Next(e) {
    e.preventDefault();
    location.reload();
  }

  return (
    <>
      <section id="container">
        <div className="card_top">
          <img src={img} alt="mobile" className="bg_img" />
        </div>
        <div className="cardBack_container">
          <img src={back_card} alt="back_card" className="card_back" />
          <span className="back_number">{cvc}</span>
        </div>
        <div className="front_card_container">
          <img src={logo} alt="logo" className="logo" />
          <div className="card_info_container">
            <img src={front_card} alt="front_card" className="card_front" />
            <div className="card_info">
              <p className="card_number">{card}</p>
              <div id="name_and_expdate">
                <p className="user_name">{name}</p>
                <div>
                  <div id="exp_info">
                    <p className="exp_moth">{month}</p>
                    <span>/</span>
                    <p className="exp_year">{year}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form action="submit">
          <label htmlFor="card_holder_name">
            <p>Cardholder Name</p>
            <input
              type="text"
              placeholder="e.g. Jane Appleseed"
              className="name_Card"
              id="card_holder_name"
              onChange={(e) => cambio(e, "name")}
            />
          </label>

          <label htmlFor="card_number">
            <p>Card Number</p>
            <input
              type="text"
              placeholder="e.g. 1234 5678 9123 0000"
              className="TC_number"
              id="card_number"
              onChange={(e) => cambio(e, "card")}
            />
            <div id="card_error_msj" className="error_container">
              <span className="wrong_format">Wrong format, numbers only</span>
            </div>
          </label>

          <div id="card_details">
            <div>
              <label htmlFor="card_exp_details">
                <p>Exp. Date (MM/YY)</p>
                <input
                  type="number"
                  placeholder="MM"
                  className="card_month"
                  id="card_exp_details"
                  onChange={(e) => cambio(e, "month")}
                />
              </label>
              <label htmlFor="card_year">
                <input
                  type="number"
                  placeholder="YY"
                  className="card_year"
                  id="card_year"
                  onChange={(e) => cambio(e, "year")}
                />
                <div className="error_container">
                  <span className="blank_space">Cant´t be blank</span>
                </div>
              </label>
            </div>
            <label htmlFor="card_cvc">
              <p>CVC</p>
              <input
                type="number"
                placeholder="e.g. 123"
                className="cvc"
                id="card_cvc"
                onChange={(e) => cambio(e, "cvc")}
              />
              <br />
              <div className="error_container">
                <span className="blank_space">Cant´t be blank</span>
              </div>
            </label>
          </div>
          <button onClick={validar}>Confirm</button>
        </form>
        <div className="send_msj">
          <img src={arrow} alt="arrow" />
          <p>
            <strong>Thank you!</strong>
          </p>
          <p className="added">We've added your card details</p>
          <button onClick={Next}>Continue</button>
        </div>
      </section>
    </>
  );
}

export default Top;
