# 星月澪の幻想笔记

使用 [Shirone](https://github.com/LyraVoid/Shirone) 官方源码版，部署到 [blog.hoshizukimio.com](https://blog.hoshizukimio.com/)。

- 主题代码：`HoshizukiMio/hoshizukimio-shirone-blog`
- 文章、图片和个人配置：`HoshizukiMio/hoshizukimio-shirone-blog-content`
- 初始化参考：https://docs.shirone.mysqil.com/guide/content-separation/init-repo

## 本地预览

需要 Node.js 24 和 Corepack。Windows 使用 `.cmd`：

```powershell
pnpm.cmd install --frozen-lockfile
git clone https://github.com/HoshizukiMio/hoshizukimio-shirone-blog-content.git content
```

在代码仓 `.env` 写入 `CONTENT_DIR=./content`，然后运行：

```powershell
pnpm.cmd content:validate
pnpm.cmd content:sync
pnpm.cmd dev
```

需要边写边看时，在另一个终端运行 `pnpm.cmd content:watch`。

## 发布内容

编辑内容仓 `content/posts/` 的 Markdown 或 `config/*.yaml`，在内容仓提交并 `git push`。详细示例见内容仓 README。

在本项目默认嵌套布局下：

```powershell
git -C content add content/posts/my-first-post
git -C content commit -m "docs(posts): publish my first post"
git -C content push
```

代码仓 `shirone.content.json` 指向远程内容仓；Vercel 构建使用官方 `content:sync` 拉取内容后构建。内容仓 Actions 通过加密 Secret `VERCEL_DEPLOY_HOOK` 触发重新部署。代码仓推送则由 Vercel Git 集成自动部署。

个人配置只在内容仓维护，未覆盖的选项跟随主题默认值。`src/user/user-config.ts`、物化后的 `src/content/`、`src/data/` 和 `public/images/` 是生成副本，请不要直接编辑。

## Vercel

- Framework: Astro
- Node: 24.x
- Install: `pnpm install --frozen-lockfile`
- Build: `pnpm build`
- Output: `dist`
- `CONTENT_REPO_URL`: 新内容仓 HTTPS Git 地址
- `BILI_SESSDATA`: 保留原有加密环境变量，用于 Bilibili 追番同步

头像、横幅、站点名称、个人简介、社交链接、Twikoo、Meting 歌单和 Umami 统计已迁移。默认示例文章、说说、系列和展示数据已移除。

## 校验

```powershell
pnpm.cmd content:validate
pnpm.cmd content:status
npx.cmd astro check
pnpm.cmd build
```

原 Mizuki 主题与内容的 Git bundle、原 Vercel 配置及环境变量备份仅保存在本地 `.setup/backups/`，不会上传到公开仓库。
`ENABLE_EXPERIMENTAL_COREPACK=1` 已在 Vercel 启用，以使用 package.json 固定的 pnpm 11.28.2。官方源码基线：`LyraVoid/Shirone@557ccf1af924defc30271900100d7d124d48e459`。
