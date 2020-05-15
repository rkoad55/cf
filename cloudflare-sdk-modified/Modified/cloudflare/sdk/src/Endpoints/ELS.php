<?php
/**
 * Created by PhpStorm.
 * User: junade
 * Date: 06/06/2017
 * Time: 15:45
 */

namespace Cloudflare\API\Endpoints;

use Cloudflare\API\Adapter\Adapter;

class ELS implements API
{
    private $adapter;

    public function __construct(Adapter $adapter)
    {
        $this->adapter = $adapter;
    }



   


    public function getInternalID(string $zoneID): string
    {   

        $query = [
            'start' => time()-200000,
            'end' => time()-1000,
            'sample' => 0.001,
            'count' =>1,
            'fields' => "ZoneID",
            
        ];
        $user = $this->adapter->getLogs('zones/' . $zoneID . '/logs/received', $query, []);

        try {
            $body = json_decode($user->getBody()->getContents());
            if(isset($body->ZoneID))
            {
               return $body->ZoneID;
            }
            else
            {
                return "FALSE";
            }
       
        } catch (Exception $e) {
            return "FALSE";
        }
        

        return $body;

        
        
        //return $body->result;

       
    }

    public function getDnsAnalytics(string $zoneID, string $since, string $until,$dimensions): \stdClass
    {   

        $query = [
            'dimensions'=>$dimensions,

            'metrics' => "queryCount,uncachedCount,staleCount,responseTimeAvg,responseTimeMedian,responseTime90th,responseTime99th",
            'since' => $since,
            'until' => $until,
            'time_delta' => 'minute'

            
        ];

        $metrics = [
            "queryCount",
            "responseTimeAvg"
            
        ];


        $user = $this->adapter->get('zones/' . $zoneID . '/dns_analytics/report/bytime', $query, []);

        $body = json_decode($user->getBody());

        
        
        return $body->result;

       
    }


    public function getZoneAccessRules(string $zoneID): array
    {   

        $query = [
            'scope_type' => 'zone',
            'per_page'  => '100'
           
            
        ];
        $user = $this->adapter->get('zones/' . $zoneID . '/firewall/access_rules/rules', $query, []);

        $body = json_decode($user->getBody());

        
        
        return $body->result;

       
    }

    public function updateZoneAccessRule(
        string $zoneID,
        string $ruleID,
        string $mode,
        string $notes
    ): \stdClass {
        $query = [
            'mode' => $mode,
            'notes' => $notes
        ];

        $user = $this->adapter->patch(
            'zones/' . $zoneID . '/firewall/access_rules/rules/' . $ruleID,
            [],
            $query
        );
        $body = json_decode($user->getBody());

        return $body->result;
    }



    public function deleteZoneAccessRule(string $zoneID, string $ruleID): bool
    {
        $user = $this->adapter->delete('zones/' . $zoneID . '/firewall/access_rules/rules/' . $ruleID, [], []);

        $body = json_decode($user->getBody());

        if (isset($body->result->id)) {
            return true;
        }

        return false;
    }





}
