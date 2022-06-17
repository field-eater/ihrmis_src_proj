<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Oath Of Office</title>
    <style>
        .w100 {
            width: 100%;
        }

        .w75 {
            width: 90%;
        }

        .w80 {
            width: 80%;
        }

        .w75 {
            width: 75%;
        }

        .w65 {
            width: 65%;
        }

        .w50 {
            width: 50%;
        }

        .w35 {
            width: 35%;
        }

        .w30 {
            width: 30%;
        }

        .w25 {
            width: 25%;
        }

        .w20 {
            width: 20%;
        }

        .w15 {
            width: 15%;
        }

        .w10 {
            width: 10%;
        }

        .center {
            text-align: center;
        }

        .dfs {
            font-size: 9px;
        }

        .ml-2 {
            margin-left: 1em;
        }

        .table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        .td {
            border-color: black;
            border-style: solid;
            border-width: 1px;
            font-family: Arial, sans-serif;
            font-size: 9;
            font-weight: normal;
            overflow: hidden;
            padding: 10px 5px;
            word-break: normal;
        }

        .mb30 {
            margin-top: 100px
        }

        .mauto {
            margin-left: auto;
            margin-right: auto;
        }

        .m0 {
            margin: 0%;
        }

        .hr {
            margin: 1px 0%;
            height: 2px;
            color: black;
        }

        .nmp {
            padding: 0px;
            margin: 0px;
            width: 100%;
            height: 100%;
        }

        .tdInner {
            width: 33%;
            font-family: Arial, sans-serif;
            font-size: 9;
            font-weight: normal;
            overflow: hidden;
            padding: 5px 0px;
            word-break: normal;
        }

        .th {
            font-weight: bold;
        }

        .tj {
            text-align: justify;
            line-height: 2rem;
            text-indent: 4rem;
        }

        .tl {
            text-align: left;
        }

        .tar {
            text-align: right;
        }

        .underline {
            text-decoration: underline;
        }
    </style>
</head>

<body style="font-family: Arial, Helvetica, sans-serif">
    <htmlpageheader name="header">
        <p class="w75 mauto m0">CS Form No. 4</p>
        <p class="w75 mauto m0 dfs">Revised 2018</p>
    </htmlpageheader>
    <sethtmlpageheader name="header" value="on" show-this-page="1" />
    <br><br>
    <p class="w75 mauto center">REPUBLIC OF THE PHILIPPINES
        <br>
        {{$applicants_office['officeAgency']->agn_name}}
    </p>
    <br>
    <p class="w75 mauto center" style="font-size: 1.5rem;">CERTIFICATION OF ASSUMPTION TO DUTY</p>
    <p class="w75 mauto tj">
        This is to certify that Ms./Mr. <span
            class="underline w65">{{ $applicants_profile['app_nm_last'] . ' ' . $applicants_profile['app_nm_first'] }}{{ $applicants_profile['app_nm_ext'] != null ? ' ' . $applicants_profile['app_nm_ext'] : '' }}{{ ', ' . strtoupper(substr($applicants_profile['app_nm_mid'], 0, 1)) . '.' }}
        </span>
        has assumed the duties and responsibilities as
        <?php $addressArr = explode('|', $applicants_profile['app_resident_addr']); ?>
        <span class="underline">
            {{ $applicants_position['pos_title'] }}
        </span>
        of
        <span class="underline">{{ $applicants_office['ofc_name'] }}</span>
        effective
        <span class="underline">{{ date('F jS, Y') }}</span>
    </p>
    <p class="w75 mauto tj">
        This certification is issued in connection with the issuance of the
        appointment of Ms./Mr. <span
            class="underline w65">{{ $applicants_profile['app_nm_last'] . ' ' . $applicants_profile['app_nm_first'] }}{{ $applicants_profile['app_nm_ext'] != null ? ' ' . $applicants_profile['app_nm_ext'] : '' }}{{ ', ' . strtoupper(substr($applicants_profile['app_nm_mid'], 0, 1)) . '.' }}
        </span>
        as
        <span class="underline">
            {{ $applicants_position['pos_title'] }}
        </span>
    </p>
    <p class="w75 mauto tj">
        Done this
        <span class="underline">{{ date('jS') }}</span>
        of
        <span class="underline">{{ date('F') }}</span>
        in
        <span class="underline">{{ date('Y') }}</span>
    </p>
    <p class="w75 mauto tj">SO HELP ME GOD</p>
    <table class="w75 mauto">
        <tr>
            <td class="w65"></td>
            <td class="w35 center">
                <b>___________________________________</b><br>
                Head of Office/Department/Unit
            </td>
        </tr>
    </table>
    <p class="w75 mauto">
        Date: ______________<br><br><br>
        Attested by:<br><br><br>
        <b>___________________________________</b><br>
        <b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            HRMO
        </b>
        <br><br><br>
        201 file<br>
        Admin<br>
        COA<br>
        CSC<br>
    </p>
</body>

</html>
