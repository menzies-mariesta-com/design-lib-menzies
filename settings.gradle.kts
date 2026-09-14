pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "1.0.0"
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    repositories {
        google()
        mavenCentral()
        // Kotlin/JS downloads Node from nodejs.org (KT-55620). Pattern must match
        // v22.0.0/node-v22.0.0-linux-x64.tar.gz — not …-tar.gz.tar.gz.
        exclusiveContent {
            forRepository {
                ivy {
                    name = "Node Distributions"
                    setUrl("https://nodejs.org/dist/")
                    patternLayout {
                        artifact("v[revision]/[artifact](-v[revision]-[classifier]).[ext]")
                    }
                    metadataSources {
                        artifact()
                    }
                    content {
                        includeModule("org.nodejs", "node")
                    }
                }
            }
            filter {
                includeGroup("org.nodejs")
            }
        }
        exclusiveContent {
            forRepository {
                ivy {
                    name = "Yarn Distributions"
                    setUrl("https://github.com/yarnpkg/yarn/releases/download")
                    patternLayout {
                        artifact("v[revision]/[artifact](-v[revision]).[ext]")
                    }
                    metadataSources {
                        artifact()
                    }
                    content {
                        includeModule("com.yarnpkg", "yarn")
                    }
                }
            }
            filter {
                includeGroup("com.yarnpkg")
            }
        }
    }
}

rootProject.name = "menzies-design-wash-ui-monorepo"

include(":menzies-design-wash-compose")
include(":demo-android")

project(":menzies-design-wash-compose").projectDir =
    file("packages/menzies-design-wash-compose")
project(":demo-android").projectDir = file("apps/demo-android/app")
