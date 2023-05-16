//@ts-nocheck
export class StreamClient {
  constructor(url, options) {
    this.url = url
    this.method = options.method || 'GET'
    this.headers = options.headers || {}
    this.body = options.body
    this.withCredentials = options.withCredentials || false

    this.CONNECTING = 0
    this.OPEN = 1
    this.CLOSED = 2

    this.readyState = this.CONNECTING
    this.onopen = null
    this.onmessage = null
    this.onerror = null
    this.onclose = null

    this.connect()
  }

  connect() {
    this._setReadyState(this.CONNECTING)

    fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: this.body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to connect: ${response.statusText}`)
        }

        this._setReadyState(this.OPEN)
        if (this.onopen) {
          this.onopen()
        }

        const reader = response.body.getReader()
        this.readStream(reader)
      })
      .catch((error) => {
        this._onStreamFailure(error)
      })
  }

  readStream(reader) {
    this.reader = reader
    reader.read().then(({ done, value }) => {
      if (done) {
        this._onStreamClosed()
        return
      }

      const chunk = new TextDecoder().decode(value)
      if (this.readyState === this.OPEN) {
        this.onmessage({ data: chunk })
      }

      this.readStream(reader)
    })
  }

  send(data) {
    if (this.readyState !== this.OPEN) {
      throw new Error('Invalid ready state')
    }

    fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: data,
    }).catch((error) => {
      if (this.onerror) {
        this.onerror(error)
      }
    })
  }

  close() {
    if (this.readyState === this.CLOSED) {
      return
    }

    this.reader?.cancel().then(() => {
      this._onStreamClosed()
    })
  }

  _setReadyState(state) {
    this.readyState = state
    if (this.onreadyStateChange) {
      this.onreadyStateChange()
    }
  }

  _onStreamClosed() {
    this.reader = null
    this._setReadyState(this.CLOSED)
    if (this.onclose) {
      this.onclose()
    }
  }

  _onStreamFailure(error) {
    if (this.onerror) {
      this.onerror(error)
    }
    this._onStreamClosed()
  }
}
