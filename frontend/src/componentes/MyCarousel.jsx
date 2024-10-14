
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css' 
import '../App.css';



const MyCarousel = () => {
    const ArrayDeImagenes = [
        {
            Imagen: "https://www.superzoo.cl/on/demandware.static/-/Library-Sites-SuperZooSharedLibrary/default/dwe3e7a685/SuperZoo/homepage/2022/main_banner/delivery-express-desktop.jpg",
            Nombre:"Producto 1"  
        },
        {
            Imagen:"https://www.superzoo.cl/on/demandware.static/-/Library-Sites-SuperZooSharedLibrary/default/dw942f60ae/SuperZoo/homepage/2024/main_banner/imbatibles/imbatibles-hills-desktop.jpg",
            Nombre:"Producto 2"
        },
        {
            Imagen:"https://www.superzoo.cl/on/demandware.static/-/Library-Sites-SuperZooSharedLibrary/default/dw1000ffb0/SuperZoo/homepage/2024/main_banner/imbatibles/imbatibles-leonardo-desktop.jpg",
            Nombre:"Producto 3"
        },
    ];
    return (

        <Carousel className='Carrusel'>
            {ArrayDeImagenes.map((Element,) => {
                return (
                    <Carousel.Item  className='ItemCarrusel'>
                        <img className="ImagenCarrusel" src={Element.Imagen} />
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
