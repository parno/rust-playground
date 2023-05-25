FROM alpine:3.14
ENV REFRESH_DATE "2023-23-05"

RUN apt-get update && apt-get install -y \
  unzip \
  wget \
  git \
  rustup \
 && rm -rf/var/lib/apt/lists/*
 
RUN useradd -m playground -d /playground
RUN usermod -p '!!' root # Disable all passwords for root

# Attach the security note
ADD --chown=playground attach_notice.sh security_notice.txt /playground/
RUN /playground/attach_notice.sh /playground/security_notice.txt /etc/passwd && \
    /playground/attach_notice.sh /playground/security_notice.txt /etc/shadow && \
    rm -f /playground/attach_notice.sh

USER playground
ENV USER=playground
ENV PATH=/playground/.cargo/bin:$PATH
WORKDIR /playground

ADD --chown=playground entrypoint.sh /playground/tools/


# Acquire and build Verus
RUN git clone https://github.com/verus-lang/verus.git
RUN cd verus/source && ./tools/get-z3.sh && source ../tools/activate && vargo build --release

ENTRYPOINT ["/playground/tools/entrypoint.sh"]
