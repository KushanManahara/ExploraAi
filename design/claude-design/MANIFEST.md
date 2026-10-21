# Claude Design system snapshot — MANIFEST

- **Source:** Claude Design project `636c69d7-a931-4b47-98a7-e9f9e1de354e` (design-system project).
- **Captured:** 2026-10-21, read-only via DesignSync `get_file`.
- **Why:** standalone Claude Design closes on 2026-12-14. This is the preservation copy (task P0).
- **Integrity method:** each file was read at least twice. It was written only when every read decoded to identical bytes. The SHA-256 values below were computed from the files on disk.
- **Scope:** every file in the remote project (107 files). Nothing was edited, and no application code was changed.

## Notes
- All four `fonts/FamiljenGrotesk-*.woff2` weights are byte-identical in the source project. So are all three `fonts/SplineSansMono-*.woff2` weights. They were copied as-is. Before production use, replace them with the real per-weight files, or use one variable font.
- `.thumbnail` is a JPEG image with no file extension.
- The brand PNGs carry C2PA content-credential metadata (provenance data added by the tool that generated them).
- `ui_kits/portfolio/` and the `km-*` brand assets belong to the owner's personal portfolio brand. The ExploraAi plan does not use the portfolio wordmark.
- `components/content/SectionHeading.prompt.md` has two bullet points run together on one line in the source. It was kept unchanged.

## Files
| Path | Bytes | SHA-256 |
|---|---:|---|
| `.thumbnail` | 12741 | `2954b9a2e3cc63f4166694aba5cec9c50e91e750cca7f676af25aa07b0f4e3e2` |
| `SKILL.md` | 905 | `ecf4a5c44e317a92c2b62a981fc52b9ca00013a5c9eae227a8d1867b65af183b` |
| `_adherence.oxlintrc.json` | 18698 | `cbc3e5d14db5667968574cfefb50df9a2179fe5726232cd19f386fba43ed77c3` |
| `_ds_bundle.js` | 88145 | `286708f6df61127bea2bb436621df9f9bbca636b200b2b201d8d7afb14f62418` |
| `_ds_manifest.json` | 21224 | `69a9650c2e86ac123f7fd216d334cebd7efd08f4d9543d8e8531896a2d00fbf5` |
| `assets/brand/km-apple-icon.png` | 12234 | `02aa4cfdcd029202846f06a0ca921ee3db14977e527efb8bb76709ea081a16b1` |
| `assets/brand/km-favicon-32.png` | 6725 | `957640f0df7108388f24ff06bb3eb1d6a3be6cbe52d47e2c98d8dfaaf4545849` |
| `assets/brand/km-icon-192.png` | 12670 | `d7d59834b691f27a80e0c140d331d717b04939c037698e9c87170fe3d9bdd236` |
| `assets/brand/km-icon-512.png` | 29224 | `6d1caa540e93423b675e0f54e61482325ead05a26e3bb98b585171c9ff883469` |
| `components/cards/ExpertiseCard.d.ts` | 470 | `891dab2d9417f85dce0cbb1987b2cc28a8e600c5f1e72a560b0a488661cf8969` |
| `components/cards/ExpertiseCard.jsx` | 1864 | `fc05535b6d3ca2303ebd11cbd86fb944b66d4aadcc2c95c3bf90aab165709434` |
| `components/cards/ExpertiseCard.prompt.md` | 295 | `38f862eea226da673ef04cae726c7f831dadfa846ed5f7ac28968eeb2ea1e278` |
| `components/cards/ProjectCard.d.ts` | 468 | `325c3c1d80d181f4c9ce1635bb2b849d8aef2ffd9f8e1b017333ffb4efcf3175` |
| `components/cards/ProjectCard.jsx` | 1556 | `18c7b4c0cd97d388efb3722c591d04cc6a4a8c29006416d5021a796ab4fda623` |
| `components/cards/ProjectCard.prompt.md` | 244 | `170efd82403f2dfec1adfb4ffbbd572ea08be7a20b8411b574e9e79a3b27361a` |
| `components/cards/ProjectRow.d.ts` | 432 | `8ee1ebb8fcef45529d60a42e9402ff89c8ba8f5c07a41a211e706bf1899007f1` |
| `components/cards/ProjectRow.jsx` | 1705 | `6297f722e8bea2d165fddba3c3792d8bd7635f4b5379f692c346a8cd3d21018a` |
| `components/cards/ProjectRow.prompt.md` | 388 | `c9bae46a771ffa6ecde4653d2f05a656d11cab733e48c29e9df05863fd48cea8` |
| `components/cards/QuoteCard.d.ts` | 269 | `76d1762e69ced78506172ca1f62278d74e456b5841d5d323b3ef1150f4fc96de` |
| `components/cards/QuoteCard.jsx` | 1789 | `0d2cb6bd84653fcb788f9f7db4ac7afca581fd7baf9c3b2fb2a0ffd7e38f5da0` |
| `components/cards/QuoteCard.prompt.md` | 289 | `5ed88b75bd11ae600e1fb4524e714bf512f8fe85264d371c18aa9de659360ca8` |
| `components/cards/cards.card.html` | 2491 | `7bddcdcdc0f1a3b575a9b8c5367f19a8da808534bedc734fa046d54205c94cd3` |
| `components/chat/ChatWidget.d.ts` | 1425 | `bceee089ef72f4247e1728bb9717ea60bf84574f5d395d7180672166c91b5c8e` |
| `components/chat/ChatWidget.jsx` | 22015 | `c76f1be8a848ea36700871779c46e82eb76aa708405a99ea4109c1a145121254` |
| `components/chat/ChatWidget.prompt.md` | 2258 | `600b61113b1e4de7a55740126fbe4f83386b5d1471c4320eec6846d31b6c5f17` |
| `components/chat/chat.card.html` | 1521 | `b91988f2050ba89cfdfc08ce83c58b005598bb1b478a7ac873638ef3a8a76bf7` |
| `components/content/FactList.d.ts` | 354 | `231d5aff07082477b5c17f32f2c36e4c478b29d1b99838f0f95cc0496814c73b` |
| `components/content/FactList.jsx` | 1103 | `c128636e287f7734f715b64948ec3de0ff81bec4a8d24f681a45d99dc95f128d` |
| `components/content/FactList.prompt.md` | 224 | `eac17bc9ddce50e9517b6168488e0ee0eb52fa692167f08ae0e480e381087f84` |
| `components/content/SectionHeading.d.ts` | 583 | `4d7d47c1add18caabc468af0c1c2b2f424cabde9fe0446256fb1b78c05f49ebf` |
| `components/content/SectionHeading.jsx` | 1095 | `30dd4af0e2f436d21cce88e5bf025338e93b5222de0b024e1bec95bcde2120a7` |
| `components/content/SectionHeading.prompt.md` | 480 | `56da140f8d12fe8c2598aaa1674129ef4941183b2efafcb01e7f944f970a894f` |
| `components/content/Stat.d.ts` | 304 | `ee0434893396060e62bc601c17d4a9b9e943e5103d259e25dea9ad1f3c9514df` |
| `components/content/Stat.jsx` | 631 | `538328d51f7d8762ee6cdf64f5a9c1ab02e4eb1fbf07ed99496f2dd5be0b3b51` |
| `components/content/Stat.prompt.md` | 242 | `9a450909f79fd947dbfdd0fb32785c8ca63b29069fa5fd579a0b2ef51b59314c` |
| `components/content/ToolTile.d.ts` | 284 | `3bb1cef00dafe7a007d36e9a470e9c5cf0fd407a4dd0e5b109713e12b2a84d9a` |
| `components/content/ToolTile.jsx` | 1269 | `6a843434ffe4bd953d59285a10fdb367fb7fb9a904f0793e279030b9af229b9b` |
| `components/content/ToolTile.prompt.md` | 193 | `dea7e7787166a881dff6a22a12ba70cba57674fa0edf16191afe332736d261f9` |
| `components/content/content.card.html` | 2295 | `8ff6f206579f1759a29bef030c6b8cabe1b798ca28983cee121068796f71ca49` |
| `components/core/ArrowOrb.d.ts` | 311 | `336ece691aa08965c06bea1bc96e2cc058f096ba2f56a4383426b0808d1ad41c` |
| `components/core/ArrowOrb.jsx` | 599 | `efa15b9a6ced81a53452e7ff5ae5464b4f820db86488616eee8edd4d78528391` |
| `components/core/ArrowOrb.prompt.md` | 277 | `497384980a417b364136b2eb09a30419d36baca9a61ad7d8b7e88a02216f82c8` |
| `components/core/BrandMark.d.ts` | 428 | `797b645b88f1f86f4f02cd19863850c49be9f89d1ce2dc22222d1bd7abf7bcb1` |
| `components/core/BrandMark.jsx` | 1317 | `c00554ac40c0cbe73d586bbc102fbeb8e7fa7f2e9b763a56752450d95bb2c1e2` |
| `components/core/BrandMark.prompt.md` | 443 | `069db196aa34e82dde9ebb032ef689c215b0bb5d7e3095bb55f6efdcffdb7c65` |
| `components/core/Button.d.ts` | 912 | `8af73ac34788b245da077ed41ccbf86d5e46cb96a7f707797c5df1d6223674fa` |
| `components/core/Button.jsx` | 2648 | `0495a51b098363b218909dd7381ae91eb33b09d742cc81531e3ff3713b0c2deb` |
| `components/core/Button.prompt.md` | 584 | `c3342b4cc4d805d7632783df0752385facf6a048d5e4943382200fbfa1c0a064` |
| `components/core/Eyebrow.d.ts` | 266 | `0763ea8e018aad78b122a7b9afece95b9bb97ab6c4740b5874de8add9c36c240` |
| `components/core/Eyebrow.jsx` | 537 | `0542345b1e813a7838415d5aef49b4b79b3e57b7821a17613fe3c38f345c5a95` |
| `components/core/Eyebrow.prompt.md` | 333 | `47d5e95d3f110eab688be85e1d5911469e5141d1870138258f094e18c8705b19` |
| `components/core/StatusDot.d.ts` | 300 | `98792993b17a9130df9cce8d7bcb4484bd83ac46fe2ccda65d280a618c7d2fa8` |
| `components/core/StatusDot.jsx` | 887 | `82355a8435f3be6b67dc46649ae1f7cf7f0920f754e61266d341cd51b98ea1fc` |
| `components/core/StatusDot.prompt.md` | 180 | `3cd0b60540e9b3aa5dd8fbfc9ffe2a8044b0c0b2941d61decbd8f95ebdd30bce` |
| `components/core/Tag.d.ts` | 454 | `80f837a8947c543e3659a5cb86c42adeb2c1a41fbd99b92ab858d7cf19d8b2c2` |
| `components/core/Tag.jsx` | 1220 | `a2a5106c468222b92665df4f40d0ea8b38e37263fa61418605e3368c480bcc77` |
| `components/core/Tag.prompt.md` | 220 | `8ecca6da90a68e82df35c7e8c9f2c60b45ff71ee3bab17a693fd85f06830ad65` |
| `components/core/core.card.html` | 2581 | `9ffaf0b69dd09b773eb3154027638b3c789790371c441f227b9e5de6d9a0e626` |
| `components/navigation/NavBar.d.ts` | 1409 | `41f489a12c20caf90a7afc20b2581acb79a44119193c2909ddab6d2d20720925` |
| `components/navigation/NavBar.jsx` | 7081 | `a32536815fda670c594d2378c107ad5637e1a63a4d596cc9f8942476590d53ce` |
| `components/navigation/NavBar.prompt.md` | 1347 | `0273fe14ee70b132221a7302d4d2fdc5902a13dd89aed1bad51b7d953708c175` |
| `components/navigation/SegmentedLens.d.ts` | 272 | `e9cc285894ff9823ce64e85378cb089ea92e434dff0607f4bc7dcdaf1da23227` |
| `components/navigation/SegmentedLens.jsx` | 1527 | `c2b80e1b0016dbe7e015a32077b37aa9ea60674b33881c99f232fb981448c46d` |
| `components/navigation/SegmentedLens.prompt.md` | 234 | `32938d9a9b6accc8ad99bfbf45e22b1db5fdd8a279d1577fc828fcfe3c28238c` |
| `components/navigation/navigation.card.html` | 3095 | `043cb1dafbcbb9d385c48f04dac58090d5767c8060d5cfdaa9e80c179315f50e` |
| `fonts/FamiljenGrotesk-400.woff2` | 18884 | `5c2a822104a1c4d658b6f070043548efbe19243aff2aab567494877056527f17` |
| `fonts/FamiljenGrotesk-500.woff2` | 18884 | `5c2a822104a1c4d658b6f070043548efbe19243aff2aab567494877056527f17` |
| `fonts/FamiljenGrotesk-600.woff2` | 18884 | `5c2a822104a1c4d658b6f070043548efbe19243aff2aab567494877056527f17` |
| `fonts/FamiljenGrotesk-700.woff2` | 18884 | `5c2a822104a1c4d658b6f070043548efbe19243aff2aab567494877056527f17` |
| `fonts/SplineSansMono-400.woff2` | 36528 | `2b193a4f0fef3fc4c6a3fa756bb5dab6c10b489acd5e0718736847755077e9ec` |
| `fonts/SplineSansMono-500.woff2` | 36528 | `2b193a4f0fef3fc4c6a3fa756bb5dab6c10b489acd5e0718736847755077e9ec` |
| `fonts/SplineSansMono-600.woff2` | 36528 | `2b193a4f0fef3fc4c6a3fa756bb5dab6c10b489acd5e0718736847755077e9ec` |
| `guidelines/app-icon.html` | 921 | `bee0b1cf3ed64c3aad50c723c9c678254412f6d7921f76e48354658e033587f9` |
| `guidelines/brand.html` | 1415 | `0977d8ddd1da931fbc0615edd82efd5da75f744ef131f7bfd5c64c59783dab29` |
| `guidelines/colors-accent.html` | 2050 | `e1d4ec27ee532cf983dd780521cd4a0b17c7fa49a52139faad64f553667cf7e7` |
| `guidelines/colors-alpha.html` | 2064 | `8c08d1471ae6a09c2dde74c83d649558831c047866936847428f4c9fd8b3660f` |
| `guidelines/colors-base.html` | 2335 | `0197be99fb74db0dc2c5d4340db7054a8a580a9c6eaabaf357cbd9e17b2b177d` |
| `guidelines/colors-semantic.html` | 2785 | `f1348ef1acd9c549a3c3df9d8aeb419a148139390ff4e2aadd3e1213402321c3` |
| `guidelines/colors-signal.html` | 1371 | `304c24d01ffd40916cb05c2a4eb9edebe300b2a5f77fef58ca00a6dda054dfdc` |
| `guidelines/glass.html` | 1134 | `aecdc1ea8a3729a5ef9adcbcbc5e0b7dcea86d6a40c3d2b74cbdcd475940c300` |
| `guidelines/motion.html` | 2300 | `7982c984d943be8796207704c9fcd575ca7fa727f8bd44d5d9c98cc5920b0520` |
| `guidelines/night.html` | 2326 | `c14b96eb08f68c17bebc28a1eb982d0b683c73e653a582e0af8199d23366e288` |
| `guidelines/radii.html` | 2670 | `5020fa3d7d2125aff97d202859e063a41a10d8df0708a901f6105fd0b4be34b5` |
| `guidelines/shadows.html` | 1675 | `7fb1360174e7f9bb9193509d07ea4a8e4c76e158df5dd076f4c3d171097de4c3` |
| `guidelines/spacing.html` | 3297 | `b0cf1edc60ef6da324b8d6aa7a388fca5d588daa4b27931be0099badc4f62330` |
| `guidelines/type-body.html` | 817 | `b2b1da5097363cf3268422ebf409982495e7809ee170179da28319dfbfef0aeb` |
| `guidelines/type-display.html` | 583 | `42148b2f83b3c0cd6e230d9a27090934f3984d0cba5bab5aa765fb620949fbbe` |
| `guidelines/type-headings.html` | 2020 | `27f1e58a26ce2803076a95956c3d16cf111e2d1e5548f2c928826d31d29b7881` |
| `guidelines/type-mono.html` | 685 | `7567f9cbbb2f3bbbfa2a9e0e544858e0710a0774a4bdb9fb80279e60799b134f` |
| `guidelines/type-serif.html` | 1081 | `85817b4421e8ad163e663346c86c7889394106eb1616952bdaf86ead28c9c76c` |
| `guidelines/type-statement.html` | 479 | `926d8a40fc90f0fb2f385bf91386acd9ab0f00e101beb8560fdab06b95d5891d` |
| `readme.md` | 7842 | `3015876018dd8a9835b389c94ab7f93101c03987ddf559feb2879cbbc0f28aad` |
| `styles.css` | 189 | `46c50af47b1d9c167402e6c7605b2b6a1e9c6aa99e8d8f6ba59aa2aa2562f5a0` |
| `thumbnail.html` | 706 | `4a61a28253d9031341c62d490938b2414589856bce309238cd41629275e516f3` |
| `tokens/base.css` | 479 | `6e3b02ac229a6e37f525fc736b8d4c882cd8ab0023f65229919fc291dceeee36` |
| `tokens/colors.css` | 2186 | `90669b927a726954b563445f0da27a07b34b5a311f019de49ef5038fbfa582d8` |
| `tokens/effects.css` | 1601 | `2e07422c02ad555b029efdbfcc08402ca42d198fd99e6d3f1681fe42e027d290` |
| `tokens/fonts.css` | 2668 | `00d050495d6c82d78268a169e8db871a1bcaee187d110848160130292c05e3a6` |
| `tokens/spacing.css` | 980 | `56465c195d07ec8c6494cbffa93c3d10dcd3c1c8744d9fae8106dc58cc1cbf7a` |
| `tokens/typography.css` | 1594 | `0c41281b53bf2ca42d359dc96ae5575fb8e213b651743ec345ae8f8a2e7d768d` |
| `ui_kits/portfolio/CaseStudy.jsx` | 4611 | `74690b278562e8d54295b3b01ba8d5fbb2244f3f17a7cbd89a74935c734f8fd2` |
| `ui_kits/portfolio/Home.jsx` | 7388 | `1a0916f8ac3b0a6eca20c544ece5e9439c6534237e6b137545f6dab960b75214` |
| `ui_kits/portfolio/ProjectsIndex.jsx` | 2530 | `3a051069c3d0f79d4803a33a06a1e8a847469c2579395dda3e5c2f120face4ee` |
| `ui_kits/portfolio/README.md` | 672 | `9b8607bc4a6392bc668bb6d3261008366f22870dca94f8d30f76fe81a1ffbcd3` |
| `ui_kits/portfolio/data.jsx` | 1382 | `404b8930600658f2a73a1a5d1c0b04399c217eec1c2464c69940009130fb1439` |
| `ui_kits/portfolio/index.html` | 2120 | `5eb31a0b4d17ba5609f7c1f09580750c820427a6dd433858788e0f85594aa9f6` |
| `uploads/pasted-1792120526726-0.png` | 68123 | `ab8d1dda286a00b027d125657d4fad6b088336e1f11127923746fb0680718eb2` |
