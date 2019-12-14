/**
 * Configures Caddy's TLS session tickets. By default, Caddy generates several keys and rotates them automatically on a regular basis, preserving forward secrecy in TLS 1.2. (Caddy is the only web server to do this by default.) You can customize this behavior.
 */
export interface SessionTickets {
  /**Disables session ticket keys. */
  disabled?: boolean
  /**How many keys to keep in memory. */
  max_keys?: number
  /**A STEK provider module that produces keys. */
  key_source?: any,
  /**Disables STEK rotation. This is discouraged. */
  disable_rotation?: boolean,
  /**How often to rotate STEKs. */
  rotation_interval?: string
}
