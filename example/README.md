使用 `Xca` 生成的证书

`crt` 转 `der`

```
openssl x509 -inform PEM -outform DER -in localhost.pem | base64 -w 0
```
