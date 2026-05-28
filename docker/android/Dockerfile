FROM node:22-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive \
    ANDROID_SDK_ROOT=/opt/android-sdk \
    ANDROID_HOME=/opt/android-sdk \
    JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 \
    PATH="/usr/lib/jvm/java-21-openjdk-amd64/bin:/opt/android-sdk/cmdline-tools/latest/bin:/opt/android-sdk/platform-tools:${PATH}"

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        bash \
        ca-certificates \
        curl \
        git \
        lib32stdc++6 \
        lib32z1 \
        unzip \
        tar \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/android-sdk/cmdline-tools /opt/jdk-21 \
    && curl -fsSL "https://api.adoptium.net/v3/binary/latest/21/ga/linux/x64/jdk/hotspot/normal/eclipse" -o /tmp/jdk21.tar.gz \
    && tar -xzf /tmp/jdk21.tar.gz -C /opt/jdk-21 --strip-components=1 \
    && rm -f /tmp/jdk21.tar.gz \
    && mkdir -p /usr/lib/jvm \
    && ln -sfn /opt/jdk-21 /usr/lib/jvm/java-21-openjdk-amd64 \
    && java -version

RUN mkdir -p /opt/android-sdk/cmdline-tools \
    && curl -fsSL https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -o /tmp/cmdline-tools.zip \
    && unzip -q /tmp/cmdline-tools.zip -d /tmp/cmdline-tools \
    && mv /tmp/cmdline-tools/cmdline-tools /opt/android-sdk/cmdline-tools/latest \
    && rm -rf /tmp/cmdline-tools /tmp/cmdline-tools.zip

RUN yes | sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --licenses >/dev/null
RUN sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" \
    "platform-tools" \
    "platforms;android-35" \
    "build-tools;35.0.0"

WORKDIR /workspace

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY src-capacitor/package*.json ./src-capacitor/
RUN cd src-capacitor && npm ci --ignore-scripts

COPY . .
RUN npm run postinstall

COPY docker/android/entrypoint.sh /usr/local/bin/android-build-entrypoint.sh
RUN chmod +x /usr/local/bin/android-build-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/android-build-entrypoint.sh"]
