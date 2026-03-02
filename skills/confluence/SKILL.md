---
name: confluence
description: Confluence Cloud REST API — 搜尋、讀取、建立、更新、刪除頁面。用於團隊知識管理操作。
metadata:
  author: Logan
  version: "2026.03.02"
---

# Confluence Skill

## 設定

```
~/.config/confluence/base_url     # e.g. https://xxx.atlassian.net
~/.config/confluence/user_email   # Atlassian account email
~/.config/confluence/api_token    # API token from id.atlassian.net
~/.config/confluence/space_key    # Space key (可以是 ~userId 格式)
```

## 認證

```bash
AUTH=$(echo -n "$(cat ~/.config/confluence/user_email):$(cat ~/.config/confluence/api_token)" | base64)
BASE=$(cat ~/.config/confluence/base_url)
```

## API 操作

### 搜尋（CQL）

```bash
SPACE=$(cat ~/.config/confluence/space_key)
curl -s -H "Authorization: Basic $AUTH" \
  "${BASE}/wiki/rest/api/content/search?cql=space%3D%22${SPACE}%22+AND+text~%22keyword%22&limit=10"
```

常用 CQL：
- `space="KEY" AND text~"keyword"` — 全文搜尋
- `space="KEY" AND type=page` — 只搜頁面
- `space="KEY" AND label="label-name"` — 按標籤

### 讀取頁面

```bash
curl -s -H "Authorization: Basic $AUTH" \
  "${BASE}/wiki/api/v2/pages/{pageId}?body-format=storage"
```

回傳含 `title`、`version.number`、`body.storage.value`（XHTML）。

### 建立頁面

```bash
curl -s -X POST -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  "${BASE}/wiki/api/v2/pages" \
  -d '{
    "spaceId": "SPACE_ID",
    "status": "current",
    "title": "Page Title",
    "body": {"representation": "storage", "value": "<p>Content</p>"}
  }'
```

注意：需要 `spaceId`（數字），不是 space key。先查 spaceId：
```bash
curl -s -H "Authorization: Basic $AUTH" \
  "${BASE}/wiki/api/v2/spaces?keys=$(cat ~/.config/confluence/space_key)" | python3 -c "import json,sys; print(json.load(sys.stdin)['results'][0]['id'])"
```

### 更新頁面

```bash
# 1. 先 GET 拿 version number
VERSION=$(curl -s -H "Authorization: Basic $AUTH" \
  "${BASE}/wiki/api/v2/pages/{pageId}" | python3 -c "import json,sys; print(json.load(sys.stdin)['version']['number'])")

# 2. PUT 更新（version + 1）
curl -s -X PUT -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  "${BASE}/wiki/api/v2/pages/{pageId}" \
  -d "{
    \"id\": \"{pageId}\",
    \"status\": \"current\",
    \"title\": \"Page Title\",
    \"body\": {\"representation\": \"storage\", \"value\": \"<p>New content</p>\"},
    \"version\": {\"number\": $((VERSION+1)), \"message\": \"Updated via API\"}
  }"
```

### 刪除頁面（移到垃圾桶）

```bash
curl -s -X DELETE -H "Authorization: Basic $AUTH" \
  "${BASE}/wiki/api/v2/pages/{pageId}"
# 成功回 204
```

## Markdown → Storage Format

| Markdown | Storage Format |
|---|---|
| `# H1` | `<h1>H1</h1>` |
| `## H2` | `<h2>H2</h2>` |
| `**bold**` | `<strong>bold</strong>` |
| `*italic*` | `<em>italic</em>` |
| `` `code` `` | `<code>code</code>` |
| `[text](url)` | `<a href="url">text</a>` |
| `- item` | `<ul><li>item</li></ul>` |
| `1. item` | `<ol><li>item</li></ol>` |
| code block | `<ac:structured-macro ac:name="code">...CDATA...</ac:structured-macro>` |
| `> quote` | `<blockquote><p>quote</p></blockquote>` |

## 注意事項

- 更新前一定要先 GET version，否則 409 conflict
- `spaceId` 是數字，`space_key` 可以是 `~userId` 格式（個人空間）
- CQL 中 space value 要用雙引號包起來（URL encode 為 `%22`）
- Rate limit: Confluence Cloud 約 100 req/min
- 刪除是 soft delete（移到垃圾桶），可在 UI 恢復
