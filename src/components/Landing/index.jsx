import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { mainInfo } from '../../redux/actions';
import './landing.scss';
import Carousel from "./Carousel/Carousel";
import { Select } from 'antd';
import 'antd/dist/antd.css';

function Landing({ mainInfo }) {


  const history = useHistory();

 const [formValues, setFormValues] = useState({plate:''});

  const onFinish = () => {
    mainInfo(formValues);
    history.push("/steps-form");
  };

  const { Option } = Select;

  function handleChangeDiscount(value) {
    setFormValues({...formValues, discount:value});
  }
  function handleChangePlate({target}) {
    setFormValues({...formValues, plate:target.value});
  }

  //chequeo si el estado se almacena correctamente
  // useEffect(() => {
  //   console.log(formValues);
  // }, [formValues])

  return (
    <>
      <section className="mainSection__container">
        <article className="soatForm__container">
          <h2>Cotiza rápido y seguro aquí</h2>
          <input type="plate" id="plate" name="plate" placeholder="Ingresa la placa" onChange={handleChangePlate}></input>
          <Select
            size={'large'}
            placeholder="Selecciona tu bono regalo"
            onChange={handleChangeDiscount}
          >
            <Option value="millas">Millas LifeMiles</Option>
            <Option value="descuento">Descuento de hasta $ 77.000</Option>
          </Select>
          <button className="soatForm__button" onClick={onFinish} value={formValues.plate.toUpperCase()}>
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
