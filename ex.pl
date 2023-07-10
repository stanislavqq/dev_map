#!/usr/bin/perl

use strict;
use warnings;

use JSON::XS;
use Text::Iconv;
use Data::Dumper;
use utf8;
no utf8;

my %a;

$a{'b'} = 1;

sub dd {
  my $s = shift;

  $s->{'b'} = 2;
}

my %c =  %a;
#print Dumper \%a;

dd(\%a);

print Dumper \%a;
print Dumper \%c;


exit();


my $strAbonement = "Абонемент";
my $template = "homeuser/eneva/email/subscription_ends";

my $stopDate = "2021-08-25";
my %template_params=(
  subscription => $strAbonement,
  promo_tariff => $strAbonement,
  promo_tariff_description => $strAbonement,
  subscription_end => $stopDate,
  promo_tariff_end => $stopDate,
  days_left =>  'день',
);


$template="homeuser/eneva/email/promo_tariff_ends";



my $title = 'заголовок';
my $email = 'miakovlev@obit.ru';
# my $email = 'dpopov@obit.ru';
my $content_type='text/html';

doveSender($title, $email, $template, \%template_params, $content_type);

sub doveSender {
    my($title_s, $email_s, $template_s, $template_params_s, $content_type_s) = @_;

    my $conv_koi8_utf8 = Text::Iconv->new("koi8-r", "utf-8");
    my $conv_win1251_utf8 = Text::Iconv->new("windows-1251", "utf-8");
    foreach my $k (keys %{$template_params_s}) {
    my $v = $conv_koi8_utf8->convert($template_params_s->{$k});
  #my $v = $template_params_s->{$k};
  utf8::decode($v);
   $template_params_s->{$k} = $v;
    }

    $title_s = $conv_koi8_utf8->convert($title_s);
    utf8::decode($title_s);

#    print Dumper $template_params_s;
    my %create_body = (
            subject => $title_s,
            from => 'ao@eneva.ru',
            to => $email_s,
            template => $template_s,
            content_type => $content_type_s,
            template_params => JSON::XS->new->utf8(0)->encode($template_params_s)
    );

    my $json=JSON::XS->new->utf8(1)->encode(\%create_body);
#    print $json;
    system("curl -X POST http://dove.oa.obit.ru/email -H 'authorization: Basic cm9vdDpaTjh4NWVmdA==' -H 'content-type: application/json' -d '$json'");
}