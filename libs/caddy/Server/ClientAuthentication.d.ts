export interface ClientAuthentication {
	/**A list of base64 DER-encoded CA certificates against which to validate client certificates. Client certs which are not signed by any of these CAs will be rejected. */
	trusted_ca_certs?: string[],
	/**A list of base64 DER-encoded client leaf certs to accept. If this list is not empty, client certs which are not in this list will be rejected. */
	trusted_leaf_certs?: string[]
}
