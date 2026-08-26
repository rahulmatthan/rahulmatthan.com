---
title: Bharat Niti Lipi
published: 2026-08-26
tags:
  - open_data
  - data_governance
  - dpi
externalUrl: https://www.livemint.com/opinion/online-views/india-single-repository-all-laws-common-legislative-markup-language-bharat-niti-lipi-11787564158064.html
urlCanonical:
categories: "[[articles]]"
writingStatus:
  - published
publication:
  - The Mint
created:

date: 2026-08-26
---

_In order to realise the ambition of having a single source of truth for all legal compliances, we need to mandate a single machine-readable format in which all our laws are published. If we can develop a uniquely Indian profile of the global Akoma Ntoso markup language and require the government to publish laws in this standard, we could imbue in our statute book the precision it has never had._

*This article was co-authored with Manish Sabharwal*

---

The [Government of India Act, 1935](https://en.wikipedia.org/wiki/Government_of_India_Act_1935), was the last gasp of a colonial empire trying to stave off demands for democracy. In 1950, our 299 [Constituent Assembly](https://en.wikipedia.org/wiki/Constituent_Assembly_of_India) members wrote a constitution that has delivered elections and given citizens a voice, but the unelected power of our administrative state has struggled to shift from ruling to governing. The immense promise of recent policy initiatives around [Jan Vishwas](https://www.pib.gov.in/PressReleasePage.aspx?PRID=1943393), aimed at trusting citizens through deregulation, decriminalization and digitization, could be accelerated by officially adopting a markup language for legislative publication called Bharat Niti Lipi (BNL).

### Unknowable Laws

The case for a single source of live, organized and searchable digital legislative truth is obvious. Anything short of that leads to ‘weighing’ citizens rather than counting them: the corruption of ‘show me the person and I will show you the rule’ or the vindictiveness of ‘show me the person and I’ll show you the crime.’ There are three challenges with creating a single source of truth: jurisdiction fragmentation, instrument proliferation and technology.

The jurisdiction issue arises because even though central, state and local governments make laws, the responsibility for publication is fragmented (across the ministries of law, IT and housing in the Union government alone). Instrument proliferation stems from the fact that compliance is created by over 25 different types of edicts (circulars, regulations, guidelines, memos, FAQs, press notes, etc) issued by the executive, many of which are not even notified in the Gazette. The technology challenge is that most Indian laws are published in PDF format, only a small subset of which are machine-readable, in the sense that their text is selectable, searchable and extractable by software. The rest are scans of paper documents that are hard for search engines, reg-tech software or other digital compliance tools to process.

An elegant solution to all three is to officially mandate a specific format in which all laws in India must be published: the legislative markup language, BNL. This would not only identify which section falls within what chapter of a given law, but also maintain a record of every amendment and revision, as well as cross-references to other statutes and subordinate regulations where relevant.

### Legal Markup Language

The UN, in an effort to help African parliaments put their statutes online, developed a format called [Akoma Ntoso](https://en.wikipedia.org/wiki/Akoma_Ntoso), which has since evolved into the preferred universal markup language for legislative publication. Laws published in this format preserve a coherent record of all their dated versions, with a level of granularity that distinguishes when a provision went into force from the moment it was enacted, and with every amendment recorded as a traceable change-log.

Several countries have notified legislative markup languages for the official publication of laws. The US government uses the [United States Legislative Markup (USLM)](https://github.com/usgpo/uslm/blob/main/USLM-User-Guide.md) language, just as the UK has developed its [Crown Legislation Markup Language (CLML)](https://www.legislation.gov.uk/projects/drafting-tool). While initially developed independently of the Akoma Ntoso format, over time they have both begun to align with their Akoma Ntoso equivalents. This loose global standardization allows them to inherit tools and expertise already developed while retaining the ability to customize formats and maintain sovereign control.

India must craft its own legislative markup language, but, in doing so, should learn from global experience. By extending a universal specification, we can both own it and shape it so that it can incorporate the specific features that an Indian legislative markup language needs. Technically speaking, BNL is just an XML vocabulary designed as an Indian profile of the international Akoma Ntoso standard. But once published in this format, all Indian laws will become machine-readable.

### Structure Forces Discipline

To work, BNL must be mandated by law. [In a previous article](https://rahulmatthan.com/other-writing/a-single-source-of-truth/), we proposed a Jan Vishwas Ashwasan (guarantee) from the government that no law left out of a canonical repository of statutes (Jan Vishwas Sangreh) needs to be complied with. This guarantee could be extended to state that the laws in the repository must be published in the structured BNL format. The biggest gain from implementing BNL will be the structure and discipline it enforces. When laws have to be presented in a prescribed format, those who draft them have to be more precise, with little room for the vagueness that lets unnotified provisions and forgotten contradictions survive unnoticed. But more importantly, structure makes the law legible to technology, ensuring that AI and future technologies can take advantage of the clarity now inherent in it.

India’s Parliament passed the Code of Criminal Procedure (Amendment) Act of 2005, the President assented, and it was duly published in the Gazette, but [10 of its provisions never came into force](https://epaper.thehindu.com/ccidist-ws/th/th_delhi/issues/196273/OPS/GI2GA9TJ5.1+GRRGAC1V4.1.html). The Act had left it to the government to decide when each section would go into effect, and for ten of them, that never happened. No one noticed. Because there was no way to notice.

The lack of a single source of truth for enterprises and citizens undermines our Constitution in spirit and letter. This must change because our democracy was born out of an antibiotic reaction to tyranny that aims to govern citizens rather than rule subjects.

But as the poet [Bulleh Shah](https://en.wikipedia.org/wiki/Bulleh_Shah) reminds us: *Naa jaane haqq di taaqat, rabb naa deve uss nu himmat* (those who don’t know the strength of their rights, the universe doesn’t give them courage).