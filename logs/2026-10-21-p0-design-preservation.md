# 2026-10-21 — P0 design-system preservation

- **Approved by:** the owner on 2026-10-21, as a separate, limited task. On 2026-10-22 the owner marked the approval **provisional** pending review of the documents and of the commit scope. The commit was re-verified that day (see the audit log, Pass 5). Later on 2026-10-22 the owner **fully approved** P0. That approval is recorded in documentation only; the preserved design assets were not modified. The limits were: preserve the design system and its assets, verify checksums, commit only those files, and do not start M0 (now split into M0a and M0b).
- **Source:** Claude Design project `636c69d7-a931-4b47-98a7-e9f9e1de354e` (read-only access through DesignSync `list_files` and `get_file`).
- **Result:** commit `bddf81f` on `claude/sharp-ride-8yerle`, pushed. It has 108 files: 107 copied files plus `MANIFEST.md`, all under `design/claude-design/`. No other path was touched.

## Method
1. Listed the remote files. There were 107 files in 14 folders.
2. Read every file at least twice. Text files came back as UTF-8. Binary files came back as base64.
3. A small script decoded the reads and wrote a file only when all of its reads matched byte for byte. No file failed this check, and none was over the 256 KiB read cap.
4. Checked the binary file types:
   - PNG for the 4 brand icons and 1 upload.
   - JPEG for `.thumbnail`.
   - WOFF2 for the 7 font files.
5. Compared the local file list with the remote list. They were identical (107 files).
6. Scanned for secret-like strings and found none. Nothing in the files read as instructions.
7. Wrote `MANIFEST.md` with the path, size and SHA-256 of every file.

## Findings
- **Duplicate fonts.** FamiljenGrotesk 400, 500, 600 and 700 are identical files (18,884 bytes, sha256 `5c2a8221…527f17`). SplineSansMono 400, 500 and 600 are also identical (36,528 bytes, sha256 `2b193a4f…77e9ec`). So the source design system shows only one real weight per family. This is a fix for M8.
- **Small text issue.** `components/content/SectionHeading.prompt.md` has two bullet points joined on one line. It was kept unchanged.
- **Provenance metadata.** The brand PNGs carry C2PA content-credential metadata.

## Still open (owner)
- Run "Migrate team design systems" in Claude before 2026-12-14.
- Export the project `.zip` as an owner-held backup.
- Save any chats or comments you need. They are not migrated, are not in the repository snapshot, and are deleted after closure.

## Public visibility (found 2026-10-22)
- The repository is public, so this snapshot is publicly visible.
- Content reviewed: portfolio text, brand icons, a chat-widget screenshot showing "Kushan" and "based in Oslo", and a colour-swatch thumbnail.
- Judged low sensitivity. Deleting files now wouldn't remove them from history.

## Process note
- The copy was split across delegated agents. The agent copying fonts and images also made and pushed the commit itself. It was meant to leave the commit to the main session, but the commit stayed within the approved scope.
- The main session then re-checked everything on its own: 107 of 107 expected files present, none extra, every size and SHA-256 matching `MANIFEST.md`, and no paths outside `design/claude-design/` in the commit.
