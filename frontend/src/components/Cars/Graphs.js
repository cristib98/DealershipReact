import React, { useState, useRef, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import CarService from '../../services/car.service'
import { Pie } from 'react-chartjs-2';
import Footer from '../Homepage/Footer'
import Pdf from "react-to-pdf";

const Graphs = () => {
    const [cars, setCars] = useState([]);
    const [benzina, setBenzina] = useState()
    const [motorina, setMotorina] = useState()
    const [electric, setElectric] = useState()
    const [pretBenzina, setPretBenzina] = useState()
    const [pretMotorina, setPretMotorina] = useState()
    const [pretElectric, setPretElectric] = useState()
    const [suv, setSuv] = useState()
    const [coupe, setCoupe] = useState()
    const [sedan, setSedan] = useState()
    const [hatchback, setHatchbak] = useState()
    const ref = React.createRef();

    const data = {
        labels: ['Benzină', 'Motorină', 'Electrice'],
        datasets: [
            {
                label: 'Nr. de mașini',
                data: [benzina, motorina, electric],
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const data2 = {
        labels: ['Benzină', 'Motorină', 'Electrice'],
        datasets: [
            {
                label: 'Preț mediu',
                data: [pretBenzina, pretMotorina, pretElectric],
                backgroundColor: [
                    'rgba(0, 123, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(0, 123, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const data3 = {
        labels: ['SUV', 'Sedan', 'Hatchback', 'Coupe'],
        datasets: [
            {
                label: 'Preț mediu',
                data: [suv, sedan, hatchback, coupe],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(0, 123, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(0, 123, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const options2 = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
        },
    }


    useEffect(() => {
        // window.scrollTo(0, 0);
        retrieveCars();
    }, []);

    const retrieveCars = () => {
        CarService.getAll().then(response => {
            var nrBenzina = 0;
            var nrMotorina = 0;
            var nrElectric = 0;
            var pretBenzina2 = 0;
            var pretMotorina2 = 0;
            var pretElectric2 = 0;
            var nrSuv = 0;
            var nrSedan = 0;
            var nrHb = 0;
            var nrCoupe = 0;
            var pretSuv = 0;
            var pretCoupe = 0;
            var pretHb = 0;
            var pretSedan = 0;
            setCars(response.data);
            console.log(response.data)
            response.data.forEach(element => {
                if (element.engine == "Benzină") {
                    nrBenzina++;
                    pretBenzina2 += element.price
                }
                else if (element.engine == "Motorină") {
                    nrMotorina++;
                    pretMotorina2 += element.price
                }
                else {
                    nrElectric++
                    pretElectric2 += element.price
                }

                if (element.category == "SUV") {
                    nrSuv++;
                    pretSuv += element.price
                }
                else if (element.category == "Hatchback") {
                    nrHb++;
                    pretHb += element.price
                }
                else if (element.category == "Sedan") {
                    nrSedan++;
                    pretSedan += element.price
                }
                else if (element.category == "Coupe") {
                    nrCoupe++;
                    pretCoupe += element.price
                }



            });
            setBenzina(nrBenzina)
            setMotorina(nrMotorina)
            setElectric(nrElectric)
            setPretBenzina(pretBenzina2 / nrBenzina)
            setPretMotorina(pretMotorina2 / nrMotorina)
            setPretElectric(pretElectric2 / nrElectric)
            setSuv(pretSuv / nrSuv)
            setCoupe(pretCoupe / nrCoupe)
            setHatchbak(pretHb / nrHb)
            setSedan(pretSedan / nrSedan)

        })
            .catch(e => {
                console.log(e);
            });





    };


    return (
        <React.Fragment>
            
            <div ref={ref}>
            <div className="container mt-3">
                <div className='header'>
                    <h1 className='title mb-4'> Prețul mediu al mașinilor în funcție de motorizare</h1>

                </div>
                <Bar data={data2} options={options2} />
            </div>
            

            <div className="header mt-5">
                <h1 className="title">Prețul mediu în funcție de  categorie</h1>
            </div>
            <div className="pieChart container mt-3">

                <Pie data={data3} />
            </div>


            <div className="container mt-5 mb-5">
                <div className='header'>
                    <h1 className='title mb-4'>Numărul de mașini în funcție de motorizare</h1>

                </div>
                <Bar data={data} options={options} />
            </div>
            </div>

            <div className="container mb-4">
            <Pdf  scale='0.5' targetRef={ref} filename="raport.pdf">
                {({ toPdf }) => <button type="button" className="btn btn-primary  btn-block mt-4" onClick={toPdf}>Generare PDF</button>}
            </Pdf>
            </div>




            <Footer />

        </React.Fragment>
    )
}

export default Graphs;