import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Footer from '../Homepage/Footer'

const Quiz = () => {
    const questions = [
        {
            questionText: 'Care e cel mai important aspect al unei mașini?',
            answerOptions: [
                { answerText: 'Spațiul de depozitare', points: 20 },
                { answerText: 'Sportivitatea.', points: 30 },
                { answerText: 'Cât de luxoasă este.', points: 40 },
                { answerText: 'Prețul accesibil', points: 10 },
            ],
        },
        {
            questionText: 'Cu câte persoane călătorești de obicei?',
            answerOptions: [
                { answerText: 'Singur', points: 30 },
                { answerText: 'Cu o persoană', points: 40 },
                { answerText: 'Cu două persoane', points: 10 },
                { answerText: 'Cu 3-4 persoane', points: 20 },
            ],
        },
        {
            questionText: 'Câte bagaje cari de obicei?',
            answerOptions: [
                { answerText: 'Multe', points: 20 },
                { answerText: 'Cumpărături.', points: 10 },
                { answerText: 'Foarte puține', points: 40 },
                { answerText: 'De obicei, deloc.', points: 30 },
            ],
        },
        {
            questionText: 'Ce dotări ai dori neaparat la o mașină?',
            answerOptions: [
                { answerText: 'Sistem de navigație.', points: 10 },
                { answerText: 'Evacuare sport.', points: 30 },
                { answerText: 'TV în spate.', points: 40 },
                { answerText: 'Portbagaj foarte mare.', points: 20 },
            ],
        },
        {
            questionText: 'Ce dotări ai dori neaparat la o mașină? (2)',
            answerOptions: [
                { answerText: 'Trapă panoramică.', points: 20 },
                { answerText: 'Scor de siguranță ridicat.', points: 10 },
                { answerText: 'Aspect sportiv.', points: 30 },
                { answerText: 'Masaj în scaune.', points: 40 },
            ],
        },
        {
            questionText: 'Ce nu îți dorești la o mașină?',
            answerOptions: [
                { answerText: 'Să plătesc foarte mult la impozit.', points: 10 },
                { answerText: 'Să nu atragă atenția.', points: 30 },
                { answerText: 'Portbagaj mic.', points: 20 },
                { answerText: 'Să nu aibă scaune din piele.', points: 40 },
            ],
        },
        {
            questionText: 'Unde ți-ai dori să îti petreci timpul cu noua mașina?',
            answerOptions: [
                { answerText: 'Întâlnirile pasionaților.', points: 30 },
                { answerText: 'Drumul către locul de muncă și înapoi.', points: 10 },
                { answerText: 'Magazine.', points: 20 },
                { answerText: 'Întâlniri de afaceri.', points: 40 },
            ],
        },
        {
            questionText: 'Care dintre următoarele mașini te atrage?',
            answerOptions: [
                { answerText: 'Toyota Supra.', points: 30 },
                { answerText: 'Tesla Model S.', points: 40 },
                { answerText: 'Ford Kuga.', points: 20 },
                { answerText: 'Renault Clio.', points: 10 },
            ],
        },
        {
            questionText: 'Ce tip de muzică asculți în mașină?',
            answerOptions: [
                { answerText: 'Ce este la radio.', points: 10 },
                { answerText: 'Rock.', points: 40 },
                { answerText: 'Hip-Hop.', points: 30 },
                { answerText: 'Country.', points: 20 },
            ],
        },
        {
            questionText: 'Cum te-ai descrie într-un cuvânt?',
            answerOptions: [
                { answerText: 'Modest.', points: 20 },
                { answerText: 'Pretențios.', points: 40 },
                { answerText: 'Simplu.', points: 10 },
                { answerText: 'Energic.', points: 30 },
            ],
        },
        {
            questionText: 'Ce tip de motor ți-ai dori pe mașină?',
            answerOptions: [
                { answerText: 'Nu știu, nu mă pricep.', points: 0 },
                { answerText: 'V6.', points: 0 },
                { answerText: '4 cilindri în linie.', points: 0 },
                { answerText: 'V8.', points: 0 },
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const { user: currentUser } = useSelector((state) => state.auth);
    var userId = -1
    if (currentUser !== null) {
        userId=currentUser.id
    }

    const handleAnswerButtonClick = (points) => {
        setScore(score + points)
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
            if (score >= 100 && score <= 175) {
                setName("Dacia Logan")
                setUrl("https://www.dacia.ro/agg/vn/unique/ONE_DACIA_PP_LARGE_DENSITY1/d_brandSite_carPicker_1.png?uri=https%3A%2F%2Fcdn.group.renault.com%2Fpackshots%2Fnew-dacia-logan-xji")
            }
            else if (score >= 176 && score <= 250) {
                setName("Volvo CX-90")
                setUrl("https://picolio.auto123.com/17photo/volvo/2017-volvo-xc90-t8-twin-engine-awd-inscription.png")
            }
            else if (score >= 251 && score <= 325) {
                setName("Ford Mustang");
                setUrl("https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/mustang/2021/collections/3_2/21_frd_mst_gt_rcrd_ps34_356x180.png");
            }
            else {
                setName("Mercedes-Benz S Class");
                setUrl("http://freebiescloud.com/wp-content/uploads/2020/12/2021-Mercedes-Benz-S-Class-4.png")
            }

        }
    };

    const reload = () => {
        window.location.reload();
    }

    if (userId === -1) {
        return <Redirect to="/login"></Redirect>
    }

    return (
        <React.Fragment>
        <div className="container test">

            <h3 className='font-weight-bold mt-5 text-center'>
                <i class="far fa-file-alt indigo-text"></i>{' '}
                Află acum care este mașina ideală pentru tine:
            </h3>
            <div className='quiz mt-5'>
                {showScore ? (
                    <div>
                        <h5 className='text-center'>Punctajul tău este: {score}</h5>
                        <h5 className='text-center mb-4 mt-3'>Mașina ideală pentru tine este:</h5>
                        <h3 className='text-center mb-4 mt-3'>~{name}~</h3>
                        <img className="imgQuiz" src={url} />
                        <Link to="/inventory">
                            <button type="button" className="btn btn-info  btn-block mt-4">Accesează inventarul</button>
                        </Link>
                        <button type="button" onClick={reload} className="btn btn-info  btn-block mt-4">Refă testul</button>
                    </div>
                ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Întrebarea {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div className='question-text'>{questions[currentQuestion].questionText}</div>
                        </div>
                        <div className='answer-section'>
                            {questions[currentQuestion].answerOptions.map((answerOption) => (
                                <button className="butonQuiz" onClick={() => handleAnswerButtonClick(answerOption.points)}>{answerOption.answerText}</button>))}
                        </div>
                    </>
                )}
            </div>
            
        </div>
        <Footer></Footer>
        </React.Fragment>
    );
}

export default Quiz