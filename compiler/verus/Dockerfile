# docker build -t verus . 
# docker run -it verus

FROM --platform=linux/amd64 alpine:3.14 as base
ENV REFRESH_DATE "2023-23-05"

RUN apk add \
  bash \
  unzip \
  wget \
  git \
  build-base \
  rustup \
 && rm -rf /var/lib/apt/lists/*

FROM base as packages

RUN adduser -h /playground -s /bin/bash -D playground  # Specify the playground user's home, shell, and don't assign a password

# Attach the security note
#ADD --chown=playground attach_notice.sh security_notice.txt /playground/
#RUN /playground/attach_notice.sh /playground/security_notice.txt /etc/passwd && \
#    /playground/attach_notice.sh /playground/security_notice.txt /etc/shadow && \
#    rm -f /playground/attach_notice.sh

USER playground
ENV USER=playground
ENV PATH=/playground/.cargo/bin:$PATH
WORKDIR /playground

ADD --chown=playground entrypoint.sh /playground/tools/


FROM packages as useradded

RUN rustup-init -y

# Acquire and build Verus
RUN git clone https://github.com/verus-lang/verus.git
RUN /bin/bash -c 'cd ~/verus/source && ./tools/get-z3.sh && source ../tools/activate'

FROM useradded as verus-prep

RUN /bin/bash -c 'cd verus/source && source ../tools/activate && vargo build --release'

ENTRYPOINT ["/playground/tools/entrypoint.sh"]
