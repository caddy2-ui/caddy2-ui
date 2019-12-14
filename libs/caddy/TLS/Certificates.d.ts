export interface Certificates {
  load_files?: Array<{
    /**The certificate file. */
    certificate: string,
    /**The private key file. */
    key: string,
    /**The format of the certificate and key. Values: pem */
    format: 'pem',
    /**Optionally associate this certificate with tags ( as strings) to keep track of them. Useful for advanced certificate selection. */
    tags?: string[]
  }>
  /**Load all certificates and keys that can be found in the specified folders. Certificates and key pairs should be bundled in the same `.pem` files. This is a quick way to load a bunch of certificates at once. */
  load_folders?: string[]
  /**A special case, this instructs the TLS app to automate certificates for the specified host/domain names. Certificates will be automated according to their matching automation policy. */
  automate?: string[]
  /**Loads certificate and key pairs directly as presented in the config, without needing to access disk. This allows you to securely transmit private keys without having to persist them to storage; you can keep them entirely in memory. */
  pem_loader?: Array<{
    /**The PEM encoding of the certificate. */
    certificate: string,
    /**The PEM encoding of the private key. */
    key: string,
    /**Optionally associate this certificate with tags ( as strings) to keep track of them. Useful for advanced certificate selection. */
    tags?: string[]
  }>
}
