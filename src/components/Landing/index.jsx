import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { mainInfo } from '../../redux/actions';
import './landing.scss';
import Carousel from "./Carousel/Carousel";
import { Select } from 'antd';
import 'antd/dist/antd.css';

function Landing({ mainInfo, response }) {
  const history = useHistory();

  const onFinish = (values) => {
    mainInfo(values);
    history.push("/steps-form");
  };

  const { Option } = Select;
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <>
      <section className="mainSection__container">
        <article className="soatForm__container">
          <h2>Cotiza rápido y seguro aquí</h2>
          <input type="search" id="search" name="search" placeholder="Ingresa la placa"></input>
          <Select
            size={'large'}
            placeholder="Selecciona tu bono regalo"
            onChange={handleChange}
          >
            <Option value="millas">Millas LifeMiles</Option>
            <Option value="descuento">Descuento de hasta $ 77.000</Option>
          </Select>
          <button className="soatForm__button" onClick={()=>console.log('click button')}>
            Cotiza SOAT gratis
          </button>
          <span className="soatForm__legales">
            Al continuar aceptas nuestros <a href="#">Términos y Condiciones & Política de Privacidad</a> para el tratamiento de tus datos.
          </span>
        </article>
        <Carousel />
      </section>
      <div className="maxwidth__container">
        <section className="aboutus__container">
          <article>
            <h1>¿Quiénes <strong>somos?</strong></h1>
            <p>Somos intermediarios con más de 40 años de experiencia, líderes en mercadeo masivo de seguros y microseguros. Entregamos soluciones a la medida, excelente servicio al cliente y manejamos todos los riesgos para que tus intereses estén bien asegurados.</p>
          </article>
          <img src="images/Siendo-Seguros-banners/Siendo-Seguros-banner-1-desktop.png" alt="Image" />
        </section>
      </div>
    </>
  );
}

const mapStateToProps = (globalState) => {
  const state = globalState.app;
  return ({
    response: state.response,
  });
};

const mapDispatchToProps = {
  mainInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
