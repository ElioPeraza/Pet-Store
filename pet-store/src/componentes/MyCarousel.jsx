
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css' 
import '../App.css';



const MyCarousel = () => {
    const ArrayDeImagenes = [
        {
            Imagen: "https://cl.pinterest.com/pin/567594359298001179/",
            Nombre:"Producto 1"  
        },
        {
            Imagen:"https://cl.pinterest.com/pin/567594359298001179/",
            Nombre:"Producto 2"
        },
        {
            Imagen:"https://cl.pinterest.com/pin/567594359298001179/",
            Nombre:"Producto 3"
        },
    ];
    return (

        <Carousel className='Carrusel'>
            {ArrayDeImagenes.map((Element,) => {
                return (
                    <Carousel.Item  className='ItemCarrusel'>
                        <img className="ImagenCarrusel" src={Element.Imagen} alt={Element.Nombre} />
                        <Carousel.Caption>
                            <h5>{Element.Nombre}</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    );
            })}
        </Carousel>
    )
};

export default MyCarousel;
