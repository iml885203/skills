---
name: confluence
description: Confluence Cloud REST API — 搜尋、讀取、建立、更新頁面。用於團隊知識管理操作。
---

# Confluence Skill

## 設定

- **Base URL**: 存在 `~/.config/confluence/base_url`（例如 `https://yoursite.atlassian.net`）
- **API Token**: 存在 `~/.config/confluence/api_token`
- **User Email**: 存在 `~/.config/confluence/user_email`

## 認證

所有 API 用 Basic Auth：
```bash
AUTH=$(echo -n "$(cat ~/.config/confluence/user_email):$(cat ~/.config/confluence/api_token)" | base64)
BASE=$(cat ~/.config/confluence/base_url)
```

## 常用操作

### 搜尋頁面（CQL）
```bash
curl -s -H "Authorization: Basic $AUTH" \
  "$BASE/wiki/rest/api/content/search?cql=space=DEV+AND+text~\"關鍵字\"&limit=10"
```

### 讀取頁面
```bash
# 取得頁面內容（storage format）
curl -s -H "Authorization: Basic $AUTH" \
  "$BASE/wiki/api/v2/pages/{pageId}?body-format=storage"
```

### 建立頁面
```bash
curl -s -X POST -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  "$BASE/wiki/api/v2/pages" \
  -d '{
    "spaceId": "SPACE_ID",
    "status": "current",
    "title": "新頁面",
    "body": {"representation": "storage", "value": "<p>內容</p>"}
  }'
```

### 更新頁面
```bash
# 1. 先 GET 拿 version number
VERSION=$(curl -s -H "Authorization: Basic $AUTH" \
  "$BASE/wiki/api/v2/pages/{pageId}" | jq '.version.number')

# 2. PUT 更新（version + 1）
curl -s -X PUT -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  "$BASE/wiki/api/v2/pages/{pageId}" \
  -d "{
    \"id\": \"{pageId}\",
    \"status\": \"current\",
    \"title\": \"頁面標題\",
    \"body\": {\"representation\": \"storage\", \"value\": \"<p>新內容</p>\"},
    \"version\": {\"number\": $((VERSION+1))}
  }"
```

### Markdown → Storage Format

Confluence 用 XHTML storage format，基本轉換：

| Markdown | Storage Format |
|---|---|
| `# H1` | `<h1>H1</h1>` |
| `**bold**` | `<strong>bold</strong>` |
| `*italic*` | `<em>italic</em>` |
| `` `code` `` | `<code>code</code>` |
| `[text](url)` | `<a href="url">text</a>` |
| `- item` | `<ul><li>item</li></ul>` |
| code block | `<ac:structured-macro ac:name="code"><ac:plain-text-body><![CDATA[...]]></ac:plain-text-body></ac:structured-macro>` |

## 注意事項

- 更新前一定要先 GET version，否則會 409 conflict
- Storage format 比較囉嗦，簡單更新可用 `representation: "wiki"` 改用 wiki markup
- 大量操作注意 rate limit（Confluence Cloud 限制約 100 req/min）
