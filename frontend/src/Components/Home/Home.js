import { Grid } from '@material-ui/core';
import React from 'react';

const Home = (() => {
    return (
        <Grid item ws={6} md={6}>
            <Grid><h3>Tutvustus</h3></Grid>
            <span>Andmebaas sisaldab Eesti Kirjandusmuuseumi Eesti Rahvaluule Arhiivi (ERA) muusikapärimust. Siit leiab eesti rahvalauluviiside üleskirjutused ja helisalvestused ning  kodeeritud meloodiad, mida on võimalik vaadata noodistusena, kuulata MIDI-failina ja matemaatiliste meetoditega analüüsida. Viiside juurde on lisatud üldandmed, mõningad muusikalised tunnused ja laulutekstide arhiiviviited.
            Eesti rahvaviiside andmebaas on praegu katsetusjärgus ja hakkab aastate jooksul täienema. Praegu leiab siit ligikaudu 4000 2-realist regiviisi ERA vanematest kogudest. Kaugeks eesmärgiks on liita sellega kõik kokku kogutud eesti rahvaviisid.
            </span>
            <Grid><h3>Ajaloost</h3></Grid>
            <span>Ingrid Rüütel ja Koit Haugase koostasid teadusliku suunitlusega Eesti Rahvamuusika Andmebaasi 1980.-1990. aastatel, mis sisaldas kodeeritud viise koos üldandmetega. Selles on ligikaudu 9000 ühe- ja kaherealise struktuuriga regiviisi eelkõige vanematest ERA käsikirjalistest kogudest. See materjal põhines omakorda Herbert Tampere koostatud viisikartoteegil, mis toimis Eesti Kirjandusmuuseumis kaua parima võimaliku rahvaviiside „andmebaasina“. Viiside leidmiseks eri tunnuste järgi valmistati kõigist kaartidest 3 koopiat ja sorteeriti need kogude, laululiikide, kihelkondade järgi. Kartoteek sisaldab eelkõige käsikirjalisi viise ja fonograafisalvestusi kuni 1975. aastani.</span>
        </Grid>
    );
})

export default Home;