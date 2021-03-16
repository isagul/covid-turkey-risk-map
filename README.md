# Türkiye Covid-19 Vaka Risk Haritası

Bu proje, Sağlık Bakanlığının haftalık açıkladığı illerin nüfuslarına göre oluşan vaka oranlarını; günlük ve haftalık vaka sayısı şeklinde il bazlı gösterilmesi için yapılmıştır.

## Haritadaki İllerin Renklendirilmesi

İller, aşağıdaki şartlara göre renklendirilmiştir.

* Yüz binde 20'nin altında vaka görülen iller "düşük riskli",
* Yüz binde 21-50 arası vaka olan iller "orta riskli",
* Yüz binde 51-100 arası vakası bulunan iller "yüksek riskli",
* Yüz binde 100'ün üstünde vaka seyri görülen iller ise "çok yüksek riskli"

İlgili şartlar [linkte](https://www.bbc.com/turkce/haberler-turkiye-56127235) yer alan haberden alınmıştır.

## Günlük Vaka Sayısının Belirlenmesi

Günlük vaka sayısı belirlenirken aşağıdaki formül baz alınmıştır.\
```
(( İl_Nüfusu / 100000 ) * İl_Vaka_Oranı) / 7
```
