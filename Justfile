quartz-bin := "pnpm exec ./quartz/bootstrap-cli.mjs"

quartz-preview:
    {{quartz-bin}} build --serve

quartz-sync:
    {{quartz-bin}} sync
