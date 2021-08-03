import React, { useState, useRef, useEffect } from "react";
import Footer from './Footer'
import ReactTooltip from "react-tooltip";
import { InputNumber } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(nr, cc, pret) {
    return { nr, cc, pret };
}

const rows = [
    createData(1, '0-1000', 48),
    createData(2, '1001-1200', 56),
    createData(3, '1201-1600', 64),
    createData(4, '1601-1800', 171),
    createData(5, '1801-2000', 190),
    createData(6, '2001-2200', 836),
    createData(7, '2201-2400', 912),
    createData(8, '2401-2600', 988),
    createData(9, '2601-2800', 2142),
    createData(10, '2801-3000', 2295),
    createData(11, '3001-3200', 4928),
    createData(12, '3201-3400', 5236),
    createData(13, '3401-3600', 5544),
    createData(14, '3601-3800', 5852),
    createData(15, '> 3800', 6160)

];



const Taxes = () => {


    const [visibleTax, setVisibleTax] = useState(false)
    const [visibleTable, setVisibleTable] = useState(false)
    const [taxa, setTaxa] = useState(0)
    const [taxaFinala, setTaxaFinala] = useState("0")


    const classes = useStyles();




    const setTaxVisible = () => {
        calculate(taxa)
        console.log("taxa finala = " + taxaFinala)
        setVisibleTax(true)
    }

    const calculate = (nr) => {
        if (nr === 0) setTaxaFinala(0)
        else if (nr <= 1000) setTaxaFinala(48)
        else if (nr <= 1200) setTaxaFinala(56)
        else if (nr <= 1600) setTaxaFinala(64)
        else if (nr <= 1800) setTaxaFinala(171)
        else if (nr <= 2000) setTaxaFinala(190)
        else if (nr <= 2200) setTaxaFinala(836)
        else if (nr <= 2400) setTaxaFinala(912)
        else if (nr <= 2600) setTaxaFinala(988)
        else if (nr <= 2800) setTaxaFinala(2142)
        else if (nr <= 3000) setTaxaFinala(2295)
        else if (nr <= 3200) setTaxaFinala(4928)
        else if (nr <= 3400) setTaxaFinala(5236)
        else if (nr <= 3600) setTaxaFinala(5544)
        else if (nr <= 3800) setTaxaFinala(5852)
        else setTaxaFinala(6160)
    }




    return (
        <React.Fragment>
            <div className="container mt-3">
                <div className="headerTaxes mt-3">
                    <h2>Calculează impozitul anual <h3><i data-tip data-for="impozitTip" className="infoImpozit fas fa-info-circle blue-text" /></h3></h2>
                    <ReactTooltip id="impozitTip" place="bottom" effect="float">
                        Impozitul este calculat pe baza capacității cilindrice a mașinii.
                    </ReactTooltip>
                </div>

                <h6 className="text-center mt-4">Introduceți capacitatea cilindrică a mașinii (cm<sup>3</sup>):</h6>
                <div className="inputNumber">
                    <input onChange={e => setTaxa(e.target.value)}></input>
                    <button type="button" class="btnCalculeaza btn btn-secondary" onClick={setTaxVisible}>Calculează</button>

                </div>
                <h2 hidden={!visibleTax}>Impozitul anual este de {taxaFinala} lei.</h2>

                <div className='shadow-sm'> <h2 className="mt-5" id='title'><i className="fas fa-hand-holding-usd blue-text"></i> Tabel de impozitare</h2>

                    <TableContainer className="mt-4 mb-5" component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nr.</TableCell>
                                    <TableCell align="right">Capacitate cilindrică (cm<sup>3</sup>)</TableCell>
                                    <TableCell align="right">Impozit anual (lei)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.nr}
                                        </TableCell>
                                        <TableCell align="right">{row.cc}</TableCell>
                                        <TableCell align="right">{row.pret}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></div>



            </div>



            <Footer />
        </React.Fragment>
    )
}

export default Taxes;