// copy parse from https://github.com/PeculiarVentures/PKI.js/blob/master/examples/CertificateComplexExample/es6.js

import React, { memo } from "react";
import Certificate from "pkijs/src/Certificate";
import RSAPublicKey from "pkijs/src/RSAPublicKey";
import *as asn1js from "asn1js";
import { bufferToHexCodes } from "pvutils";

//region Put information about X.509 certificate issuer
export const rdnmap = {
  "2.5.4.6": "C",
  "2.5.4.10": "O",
  "2.5.4.11": "OU",
  "2.5.4.3": "CN",
  "2.5.4.7": "L",
  "2.5.4.8": "S",
  "2.5.4.12": "T",
  "2.5.4.42": "GN",
  "2.5.4.43": "I",
  "2.5.4.4": "SN",
  "1.2.840.113549.1.9.1": "E-mail"
};

//region Put information about signature algorithm
export const algomap = {
  "1.2.840.113549.1.1.2": "MD2 with RSA",
  "1.2.840.113549.1.1.4": "MD5 with RSA",
  "1.2.840.10040.4.3": "SHA1 with DSA",
  "1.2.840.10045.4.1": "SHA1 with ECDSA",
  "1.2.840.10045.4.3.2": "SHA256 with ECDSA",
  "1.2.840.10045.4.3.3": "SHA384 with ECDSA",
  "1.2.840.10045.4.3.4": "SHA512 with ECDSA",
  "1.2.840.113549.1.1.10": "RSA-PSS",
  "1.2.840.113549.1.1.5": "SHA1 with RSA",
  "1.2.840.113549.1.1.14": "SHA224 with RSA",
  "1.2.840.113549.1.1.11": "SHA256 with RSA",
  "1.2.840.113549.1.1.12": "SHA384 with RSA",
  "1.2.840.113549.1.1.13": "SHA512 with RSA"
}; // array mapping of common algorithm OIDs and corresponding types

import { makeStyles, useTheme } from "@material-ui/core";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";


export type SubjectRow = {
  type: string
  value: { valueBlock: { value: string } }
}
export const map2DisplayRow = (row: SubjectRow) => ({ typeval: rdnmap[row.type] || row.type, subjval: row.value.valueBlock.value })

export interface Props {
  certificate: any
}

const useStyles = makeStyles(theme => ({
  trowName: {
    whiteSpace: 'pre',
    textAlign: 'right',
    verticalAlign: 'top',
    fontWeight: 'bold',
  },
  tbody: {
    '&>tr>td': {
      borderBottom: '0px',
    }
  },
  rowName: {
    whiteSpace: 'pre',
    textAlign: 'right',
  },
  rowVal: {
    width: '100%'
  }
}))

export const parseCert = (cert: string): any => {
  if (!cert) {
    return null
  }
  try {
    let buf = Uint8Array.from(atob(cert), c => c.charCodeAt(0)).buffer
    const asn1 = asn1js.fromBER(buf)
    const certificate = new Certificate({ schema: asn1.result });
    return certificate
  } catch (err) {
    return null
  }
}

export const CertInfo: React.StatelessComponent<Props> = memo(({ certificate }) => {

  const classes = useStyles(useTheme())

  const issuerRows = (certificate.issuer.typesAndValues as SubjectRow[]).map(map2DisplayRow)
  const subjRows = (certificate.subject.typesAndValues as SubjectRow[]).map(map2DisplayRow)
  let publicKeySize = "< unknown >";
  if (certificate.subjectPublicKeyInfo.algorithm.algorithmId.indexOf("1.2.840.113549") !== (-1)) {
    const asn1PublicKey = asn1js.fromBER(certificate.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex);
    const rsaPublicKey = new RSAPublicKey({ schema: asn1PublicKey.result });

    const modulusView = new Uint8Array(rsaPublicKey.modulus.valueBlock.valueHex);
    let modulusBitLength = 0;

    if (modulusView[0] === 0x00)
      modulusBitLength = (rsaPublicKey.modulus.valueBlock.valueHex.byteLength - 1) * 8;
    else
      modulusBitLength = rsaPublicKey.modulus.valueBlock.valueHex.byteLength * 8;

    publicKeySize = modulusBitLength.toString();
  }
  let signatureAlgorithm = algomap[certificate.signatureAlgorithm.algorithmId];
  if (typeof signatureAlgorithm === "undefined")
    signatureAlgorithm = certificate.signatureAlgorithm.algorithmId;
  else
    signatureAlgorithm = `${signatureAlgorithm} (${certificate.signatureAlgorithm.algorithmId})`;

  return (
    <Table size='small'>
      <TableBody>
        <TableRow>
          <TableCell className={classes.trowName}>Issuer</TableCell>
          <TableCell style={{ paddingLeft: 0, paddingTop: 0, width: '100%' }}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.rowName}>OID</TableCell>
                  <TableCell className={classes.rowVal}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tbody}>
                {issuerRows.map((row) => (
                  <TableRow key={row.typeval}>
                    <TableCell className={classes.rowName} padding='checkbox'>{row.typeval}</TableCell>
                    <TableCell>{row.subjval}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.trowName}>Subject</TableCell>
          <TableCell style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.rowName}>OID</TableCell>
                  <TableCell style={{ width: '100%' }}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tbody}>
                {subjRows.map((row) => (
                  <TableRow key={row.typeval}>
                    <TableCell className={classes.rowName} padding='checkbox'>{row.typeval}</TableCell>
                    <TableCell>{row.subjval}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.trowName} >Serial number</TableCell>
          <TableCell>{bufferToHexCodes(certificate.serialNumber.valueBlock.valueHex)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.trowName}>Issuance date</TableCell>
          <TableCell>{certificate.notBefore.value.toString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.trowName}>Expiration date</TableCell>
          <TableCell>{certificate.notAfter.value.toString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.trowName}>Public key size (bits)</TableCell>
          <TableCell>{publicKeySize}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.trowName}>Signature algorithm</TableCell>
          <TableCell>{signatureAlgorithm}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.trowName}>Extensions</TableCell>
          <TableCell style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>OID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tbody}>
                {(certificate.extensions as { extnID: string }[]).map((extension) => (
                  <TableRow key={extension.extnID}>
                    <TableCell>{extension.extnID}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
})
