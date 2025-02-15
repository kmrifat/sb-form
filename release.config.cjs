module.exports = {
    branch: ['main', {name: "preview", prerelease: "preview"}],
    plugin: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        "@semantic-release/npm",
        "@semantic-release/github"
    ]
}